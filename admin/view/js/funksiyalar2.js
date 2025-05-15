import { API_URL } from '../../../js/api-url.js'
import { getAuthHeaders, verify } from '../../js/verify-token.js'

// DOM Elements
const featuresTableBody = document.getElementById('featuresTableBody')
const emptyState = document.getElementById('emptyState')
const featureForm = document.getElementById('featureForm')
const featureId = document.getElementById('featureId')
const featureCode = document.getElementById('featureCode')
const featureName = document.getElementById('featureName')
const featureDescription = document.getElementById('featureDescription')
const createFeatureBtn = document.getElementById('createFeatureBtn')
const saveFeatureBtn = document.getElementById('saveFeatureBtn')
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn')
const deleteFeatureName = document.getElementById('deleteFeatureName')
const loadingOverlay = document.getElementById('loadingOverlay')
const successToast = document.getElementById('successToast')
const errorToast = document.getElementById('errorToast')
const successToastMessage = document.getElementById('successToastMessage')
const errorToastMessage = document.getElementById('errorToastMessage')

// Bootstrap Modal Instances
const featureModal = new bootstrap.Modal(document.getElementById('featureModal'))
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'))
const successToastInstance = new bootstrap.Toast(successToast)
const errorToastInstance = new bootstrap.Toast(errorToast)

// API Endpoints
const API_ENDPOINTS = {
    CREATE: '/api/features/create',
    GET_ALL: '/api/features/get-all',
    UPDATE: (id) => `/api/features/update/${id}`,
    DELETE: (id) => `/api/features/delete/${id}`
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
        showLoading()
        const response = await fetch(`${API_URL}${API_ENDPOINTS.GET_ALL}`, {
            headers: getAuthHeaders()
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || `HTTP error! Status: ${response.status}`)
        }

        const features = await response.json()
        renderFeatures(features)
    } catch (error) {
        console.error('Error fetching features:', error)
        showErrorMessage('Funksiyalar yuklanmadi. Qaytadan urinib ko\'ring.')
    } finally {
        hideLoading()
    }
}

// Render features in the table
function renderFeatures(features) {
    featuresTableBody.innerHTML = ''
    const featureCards = document.getElementById('featureCards')
    featureCards.innerHTML = ''

    if (features.length === 0) {
        emptyState.classList.remove('d-none')
        return
    }

    emptyState.classList.add('d-none')

    features.forEach((feature, index) => {
        // Table row
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${feature.name}</td>
            <td>${feature.code || "-"}</td>
            <td>${feature.description || "-"}</td>
            <td>${new Date(feature.createdAt).toLocaleDateString('uz-UZ')}</td>
            <td class="table-actions">
                <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-id="${feature._id}">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${feature._id}" data-name="${feature.name}">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `
        featuresTableBody.appendChild(row)

        // Card for mobile view
        const card = document.createElement('div')
        card.className = 'feature-card'
        card.innerHTML = `
            <div class="feature-card-header">
                <h3 class="feature-card-title">${feature.name}</h3>
                <div class="feature-card-code">${feature.code || "-"}</div>
            </div>
            <div class="feature-card-info">
                <div class="feature-card-info-item">
                    <span class="feature-card-info-label">Qo'shilgan sana:</span>
                    <span>${new Date(feature.createdAt).toLocaleDateString('uz-UZ')}</span>
                </div>
            </div>
            <div class="feature-card-description">
                ${feature.description || "Tavsif mavjud emas"}
            </div>
            <div class="feature-card-actions">
                <button class="btn btn-sm btn-outline-primary edit-btn" data-id="${feature._id}">
                    <i class="bi bi-pencil me-1"></i>Tahrirlash
                </button>
                <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${feature._id}" data-name="${feature.name}">
                    <i class="bi bi-trash me-1"></i>O'chirish
                </button>
            </div>
        `
        featureCards.appendChild(card)
    })

    // Add event listeners to edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditClick)
    })

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteClick)
    })
}

// Handle create feature button click
function handleCreateClick() {
    // Reset form
    featureForm.reset()
    featureId.value = ''

    // Update modal title
    document.getElementById('featureModalLabel').textContent = 'Yangi funksiya qo\'shish'

    // Show modal
    featureModal.show()
}

// Handle edit feature button click
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

        const features = await response.json()
        const feature = features.find(f => f._id === id)

        if (!feature) {
            throw new Error('Funksiya topilmadi')
        }

        // Fill form with feature data
        featureId.value = id
        featureCode.value = feature.code
        featureName.value = feature.name
        featureDescription.value = feature.description

        // Update modal title
        document.getElementById('featureModalLabel').textContent = 'Funksiyani tahrirlash'

        // Show modal
        featureModal.show()
    } catch (error) {
        console.error('Error fetching feature details:', error)
        showErrorMessage('Funksiya ma\'lumotlari yuklanmadi. Qaytadan urinib ko\'ring.')
    } finally {
        hideLoading()
    }
}

// Handle delete feature button click
function handleDeleteClick(event) {
    const id = event.currentTarget.dataset.id
    const name = event.currentTarget.dataset.name

    // Set feature ID and name in delete modal
    confirmDeleteBtn.dataset.id = id
    deleteFeatureName.textContent = name

    // Show delete modal
    deleteModal.show()
}

// Handle save feature button click
async function handleSaveFeature() {
    // Validate form
    if (!featureForm.checkValidity()) {
        featureForm.reportValidity()
        return
    }

    const id = featureId.value
    const isEdit = !!id

    const featureData = {
        code: featureCode.value,
        name: featureName.value,
        description: featureDescription.value
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
            body: JSON.stringify(featureData)
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Xatolik yuz berdi')
        }

        // Close modal
        featureModal.hide()

        // Show success message
        const message = isEdit ? 'Funksiya muvaffaqiyatli yangilandi!' : 'Funksiya muvaffaqiyatli qo\'shildi!'
        showSuccessMessage(message)

        // Refresh features list
        await fetchFeatures()
    } catch (error) {
        console.error('Error saving feature:', error)
        showErrorMessage(error.message || 'Funksiya saqlanmadi. Qaytadan urinib ko\'ring.')
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
        showSuccessMessage('Funksiya muvaffaqiyatli o\'chirildi!')

        // Refresh features list
        await fetchFeatures()
    } catch (error) {
        console.error('Error deleting feature:', error)
        showErrorMessage(error.message || 'Funksiya o\'chirilmadi. Qaytadan urinib ko\'ring.')
    } finally {
        hideLoading()
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    await verify()
    // Fetch features on page load
    fetchFeatures()

    // Add event listeners
    createFeatureBtn.addEventListener('click', handleCreateClick)
    saveFeatureBtn.addEventListener('click', handleSaveFeature)
    confirmDeleteBtn.addEventListener('click', handleConfirmDelete)
}); 