import { API_URL } from '../../../js/api-url.js'
import { getAuthHeaders, isAuthenticated, verify } from '../../js/verify-token.js'

// Check if user is authenticated
if (!isAuthenticated()) {
    window.location.href = '/login.html';
}

// DOM Elements
const tariffsTableBody = document.getElementById('tariffsTableBody')
const emptyState = document.getElementById('emptyState')
const tariffForm = document.getElementById('tariffForm')
const tariffId = document.getElementById('tariffId')
const tariffName = document.getElementById('tariffName')
const tariffPrice = document.getElementById('tariffPrice')
const tariffDuration = document.getElementById('tariffDuration')
const tariffDurationCount = document.getElementById('tariffDurationCount')
const isFreeTrial = document.getElementById('isFreeTrial')
const tariffFeatures = document.getElementById('tariffFeatures')
const tariffDescription = document.getElementById('tariffDescription')
const createTariffBtn = document.getElementById('createTariffBtn')
const saveTariffBtn = document.getElementById('saveTariffBtn')
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn')
const deleteTariffName = document.getElementById('deleteTariffName')
const loadingOverlay = document.getElementById('loadingOverlay')
const successToast = document.getElementById('successToast')
const errorToast = document.getElementById('errorToast')
const successToastMessage = document.getElementById('successToastMessage')
const errorToastMessage = document.getElementById('errorToastMessage')

// Bootstrap Modal Instances
const tariffModal = new bootstrap.Modal(document.getElementById('tariffModal'))
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
const successToastInstance = new bootstrap.Toast(successToast)
const errorToastInstance = new bootstrap.Toast(errorToast)

// API Endpoints
const API_ENDPOINTS = {
    CREATE: '/api/tariffs/create',
    GET_ALL: '/api/tariffs/get-all',
    UPDATE: (id) => `/api/tariffs/update/${id}`,
    DELETE: (id) => `/api/tariffs/delete/${id}`,
    GET_FEATURES: '/api/features/get-all'
}

// Show loading overlay
function showLoading() {
    loadingOverlay.classList.remove('d-none')
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.classList.add('d-none')
}

// Show success toast
function showSuccessMessage(message) {
    successToastMessage.textContent = message
    successToastInstance.show()
}

// Show error toast
function showErrorMessage(message) {
    errorToastMessage.textContent = message
    errorToastInstance.show()
}

// Fetch all features
async function fetchFeatures() {
    try {
        const response = await fetch(`${API_URL}${API_ENDPOINTS.GET_FEATURES}`, {
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || `HTTP error! Status: ${response.status}`)
        }

        const features = await response.json()
        return features
    } catch (error) {
        console.error('Error fetching features:', error)
        showErrorMessage('Funksiyalar yuklanmadi. Qaytadan urinib ko\'ring.')
        return []
    }
}

// Populate features select
async function populateFeaturesSelect() {
    const features = await fetchFeatures()
    tariffFeatures.innerHTML = ''

    // Create feature groups
    const groups = {
        "Asosiy funksiyalar": [],
        "Qo'shimcha funksiyalar": []
    }

    // Sort features into groups
    features.forEach(feature => {
        if (feature.code.startsWith('basic_')) {
            groups["Asosiy funksiyalar"].push(feature)
        } else {
            groups["Qo'shimcha funksiyalar"].push(feature)
        }
    })

    // Create feature groups and checkboxes
    Object.entries(groups).forEach(([groupName, groupFeatures]) => {
        const groupDiv = document.createElement('div')
        groupDiv.className = 'mb-3'

        const groupLabel = document.createElement('label')
        groupLabel.className = 'form-label fw-bold'
        groupLabel.textContent = groupName
        groupDiv.appendChild(groupLabel)

        const checkboxesDiv = document.createElement('div')
        checkboxesDiv.className = 'ms-3'

        groupFeatures.forEach(feature => {
            const checkboxDiv = document.createElement('div')
            checkboxDiv.className = 'form-check'

            const checkbox = document.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.className = 'form-check-input feature-checkbox'
            checkbox.id = `feature-${feature._id}`
            checkbox.value = feature._id
            checkbox.dataset.name = feature.name

            const label = document.createElement('label')
            label.className = 'form-check-label'
            label.htmlFor = `feature-${feature._id}`
            label.textContent = feature.name

            checkboxDiv.appendChild(checkbox)
            checkboxDiv.appendChild(label)
            checkboxesDiv.appendChild(checkboxDiv)
        })

        groupDiv.appendChild(checkboxesDiv)
        tariffFeatures.appendChild(groupDiv)
    })
}

// Fetch all tariffs
async function fetchTariffs() {
    try {
        showLoading()
        
        // Get all features first
        const featuresResponse = await fetch(`${API_URL}${API_ENDPOINTS.GET_FEATURES}`, {
            headers: getAuthHeaders()
        })
        
        if (!featuresResponse.ok) {
            throw new Error('Funksiyalar yuklanmadi')
        }
        
        const allFeatures = await featuresResponse.json()
        
        // Get all tariffs
        const response = await fetch(`${API_URL}${API_ENDPOINTS.GET_ALL}`, {
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || `HTTP error! Status: ${response.status}`)
        }

        const tariffs = await response.json()
        
        // Create a map of existing feature IDs
        const existingFeatureIds = new Set(allFeatures.map(f => f._id))
        
        // Add all features to each tariff, marking non-existent ones
        tariffs.forEach(tariff => {
            const existingFeatures = new Set(tariff.features.map(f => f._id))
            tariff.allFeatures = allFeatures.map(feature => ({
                ...feature,
                exists: existingFeatures.has(feature._id)
            }))
        })

        renderTariffs(tariffs)
    } catch (error) {
        console.error('Error fetching tariffs:', error)
        showErrorMessage('Tariflar yuklanmadi. Qaytadan urinib ko\'ring.')
    } finally {
        hideLoading()
    }
}

// Render tariffs in the table
function renderTariffs(tariffs) {
    tariffsTableBody.innerHTML = ''
    const tariffCards = document.getElementById('tariffCards')
    tariffCards.innerHTML = ''

    if (tariffs.length === 0) {
        emptyState.classList.remove('d-none')
        return
    }

    emptyState.classList.add('d-none')

    tariffs.forEach((tariff, index) => {
        // Table row
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${tariff.name}</td>
            <td>$${tariff.price}</td>
            <td>${getDurationText(tariff.duration)}</td>
            <td>${tariff.duration_count}</td>
            <td>${tariff.is_free_trial ? 'Ha' : 'Yo\'q'}</td>
            <td>
                <div class="feature-badges-container">
                    ${tariff.allFeatures.map(feature => `
                        <span class="badge ${feature.exists ? 'bg-primary' : 'bg-danger'} feature-badge">
                            ${feature.name}
                            ${!feature.exists ? ' <i class="bi bi-exclamation-circle"></i>' : ''}
                        </span>
                    `).join('')}
                </div>
            </td>
            <td class="table-actions">
                <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-id="${tariff._id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${tariff._id}" data-name="${tariff.name}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `
        tariffsTableBody.appendChild(row)

        // Card for mobile view
        const card = document.createElement('div')
        card.className = 'tariff-card'
        card.innerHTML = `
            <div class="tariff-card-header">
                <h3 class="tariff-card-title">${tariff.name}</h3>
                <div class="tariff-card-price">$${tariff.price}</div>
            </div>
            <div class="tariff-card-info">
                <div class="tariff-card-info-item">
                    <span class="tariff-card-info-label">Davomiyligi:</span>
                    <span>${getDurationText(tariff.duration)}</span>
                </div>
                <div class="tariff-card-info-item">
                    <span class="tariff-card-info-label">Soni:</span>
                    <span>${tariff.duration_count}</span>
                </div>
                <div class="tariff-card-info-item">
                    <span class="tariff-card-info-label">Bepul sinov:</span>
                    <span>${tariff.is_free_trial ? 'Ha' : 'Yo\'q'}</span>
                </div>
            </div>
            <div class="tariff-card-features">
                <div class="tariff-card-info-label mb-2">Funksiyalar:</div>
                <div class="feature-badges-container">
                    ${tariff.allFeatures.map(feature => `
                        <span class="badge ${feature.exists ? 'bg-primary' : 'bg-danger'} feature-badge">
                            ${feature.name}
                            ${!feature.exists ? ' <i class="bi bi-exclamation-circle"></i>' : ''}
                        </span>
                    `).join('')}
                </div>
            </div>
            <div class="tariff-card-actions">
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${tariff._id}">
                    <i class="bi bi-pencil me-1"></i>Tahrirlash
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${tariff._id}" data-name="${tariff.name}">
                    <i class="bi bi-trash me-1"></i>O'chirish
                </button>
            </div>
        `
        tariffCards.appendChild(card)
    })

    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditClick)
    })

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteClick)
    })
}

// Get duration text
function getDurationText(duration) {
    switch (duration) {
        case 'daily':
            return 'Kunlik'
        case 'monthly':
            return 'Oylik'
        case 'yearly':
            return 'Yillik'
        default:
            return duration
    }
}

// Handle create tariff button click
function handleCreateClick() {
    // Reset form
    tariffForm.reset()
    tariffId.value = ''

    // Update modal title
    document.getElementById('tariffModalLabel').textContent = 'Yangi tarif qo\'shish'

    // Show modal
    tariffModal.show()
}

// Handle edit tariff button click
async function handleEditClick(event) {
    const id = event.currentTarget.dataset.id

    try {
        showLoading()
        const response = await fetch(`${API_URL}${API_ENDPOINTS.GET_ALL}`, {
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || `HTTP error! Status: ${response.status}`)
        }

        const tariffs = await response.json()
        const tariff = tariffs.find(t => t._id === id)

        if (!tariff) {
            throw new Error('Tarif topilmadi')
        }

        // Fill form with tariff data
        tariffId.value = id
        tariffName.value = tariff.name
        tariffPrice.value = tariff.price
        tariffDuration.value = tariff.duration
        tariffDurationCount.value = tariff.duration_count
        isFreeTrial.checked = tariff.is_free_trial
        tariffDescription.value = tariff.description || ''

        // Set selected features
        document.querySelectorAll('.feature-checkbox').forEach(checkbox => {
            checkbox.checked = tariff.features.some(f => f._id === checkbox.value)
        })

        // Update modal title
        document.getElementById('tariffModalLabel').textContent = 'Tarifni tahrirlash'

        // Show modal
        tariffModal.show()
    } catch (error) {
        console.error('Error fetching tariff details:', error)
        showErrorMessage('Tarif ma\'lumotlari yuklanmadi. Qaytadan urinib ko\'ring.')
    } finally {
        hideLoading()
    }
}

// Handle delete tariff button click
function handleDeleteClick(event) {
    const id = event.currentTarget.dataset.id
    const name = event.currentTarget.dataset.name

    // Set tariff ID and name in delete modal
    confirmDeleteBtn.dataset.id = id
    deleteTariffName.textContent = name

    // Show delete modal
    deleteModal.show()
}

// Handle save tariff button click
async function handleSaveTariff() {
    // Validate form
    if (!tariffForm.checkValidity()) {
        tariffForm.reportValidity()
        return
    }

    const id = tariffId.value
    const isEdit = !!id

    // Get selected features
    const selectedFeatures = Array.from(document.querySelectorAll('.feature-checkbox:checked')).map(checkbox => checkbox.value)

    const tariffData = {
        name: tariffName.value,
        price: parseFloat(tariffPrice.value),
        duration: tariffDuration.value,
        duration_count: parseInt(tariffDurationCount.value),
        is_free_trial: isFreeTrial.checked,
        features: selectedFeatures,
        description: tariffDescription.value
    }

    try {
        showLoading()

        const url = isEdit ? API_ENDPOINTS.UPDATE(id) : API_ENDPOINTS.CREATE
        const method = isEdit ? 'PUT' : 'POST'

        const response = await fetch(`${API_URL}${url}`, {
            method: method,
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tariffData)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Xatolik yuz berdi')
        }

        // Close modal
        tariffModal.hide()

        // Show success message
        const message = isEdit ? 'Tarif muvaffaqiyatli yangilandi!' : 'Tarif muvaffaqiyatli qo\'shildi!'
        showSuccessMessage(message)

        // Refresh tariffs list
        await fetchTariffs()
    } catch (error) {
        console.error('Error saving tariff:', error)
        showErrorMessage(error.message || 'Tarif saqlanmadi. Qaytadan urinib ko\'ring.')
    } finally {
        hideLoading()
    }
}

// Handle confirm delete button click
async function handleConfirmDelete() {
    const id = confirmDeleteBtn.dataset.id

    try {
        showLoading()

        const response = await fetch(`${API_URL}${API_ENDPOINTS.DELETE(id)}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Xatolik yuz berdi')
        }

        // Close modal
        deleteModal.hide()

        // Show success message
        showSuccessMessage('Tarif muvaffaqiyatli o\'chirildi!')

        // Refresh tariffs list
        await fetchTariffs()
    } catch (error) {
        console.error('Error deleting tariff:', error)
        showErrorMessage(error.message || 'Tarif o\'chirilmadi. Qaytadan urinib ko\'ring.')
    } finally {
        hideLoading()
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    await verify()
    // Populate features select
    await populateFeaturesSelect()

    // Fetch tariffs on page load
    await fetchTariffs()

    // Add event listeners
    createTariffBtn.addEventListener('click', handleCreateClick)
    saveTariffBtn.addEventListener('click', handleSaveTariff)
    confirmDeleteBtn.addEventListener('click', handleConfirmDelete)
}); 