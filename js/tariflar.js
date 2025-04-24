import { API_URL } from './api-url.js'
import { getAuthHeaders, isAuthenticated } from './verify-token.js'

// Check if user is authenticated
if (!isAuthenticated()) {
    window.location.href = '/login.html';
}

let currentSelectedTariff = null;
let allTariffs = [];
let allCafes = [];

// Create loader element
function createLoader() {
    const loader = document.createElement('div');
    loader.id = 'tariffsLoader';
    loader.className = 'loader-container';
    loader.innerHTML = `
        <div class="text-center p-5">
            <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Yuklanmoqda...</span>
            </div>
            <div class="mt-3 text-success">Ma'lumotlar yuklanmoqda...</div>
        </div>
    `;
    return loader;
}

// Add loader styles
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    .loader-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
`;
document.head.appendChild(loaderStyle);

// Function to show/hide loader
function toggleLoader(show) {
    let loader = document.getElementById('tariffsLoader');
    
    if (show) {
        // Create loader if it doesn't exist
        if (!loader) {
            loader = createLoader();
            document.body.appendChild(loader);
        }
    } else {
        // Remove loader if it exists
        if (loader) {
            loader.remove();
        }
    }
}

// Load initial data
document.addEventListener('DOMContentLoaded', async () => {
    try {
        toggleLoader(true);
        const adminId = localStorage.getItem('id');
        console.log('Admin ID:', adminId);

        // Load cafes first
        const cafesResponse = await fetch(`${API_URL}/api/crud/kafes/${adminId}`, {
            headers: getAuthHeaders()
        });

        if (cafesResponse.status === 401) {
            window.location.href = '/login.html';
            return;
        }

        if (!cafesResponse.ok) {
            throw new Error('Failed to load cafes');
        }

        allCafes = await cafesResponse.json();
        console.log('Loaded cafes:', allCafes);

        // Create container for dropdown
        const cafeDropdownContainer = document.createElement('div');
        cafeDropdownContainer.className = 'mb-4';


        // Create and insert cafe selection dropdown
        const cafeSelect = document.createElement('select');
        cafeSelect.className = 'form-select';
        cafeSelect.id = 'cafe-select';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Kafeni tanlang';
        cafeSelect.appendChild(defaultOption);

        // Add all cafe options
        if (Array.isArray(allCafes)) {
            allCafes.forEach(cafe => {
                const option = document.createElement('option');
                option.value = cafe._id;
                option.textContent = cafe.name;
                cafeSelect.appendChild(option);
            });
        }

        // Add select to container
        cafeDropdownContainer.appendChild(cafeSelect);

        // Create container for tariffs with proper spacing
        const mainContainer = document.createElement('div');
        mainContainer.className = 'container mt-5';

        // Get the original tariffs container
        const tariffsContainer = document.getElementById('tariffsContainer');
        
        // Insert dropdown and main container before tariffs container
        tariffsContainer.parentElement.insertBefore(cafeDropdownContainer, tariffsContainer);
        tariffsContainer.parentElement.insertBefore(mainContainer, tariffsContainer);
        
        // Move tariffs container inside main container
        mainContainer.appendChild(tariffsContainer);

        // Set up tariffs container
        tariffsContainer.className = 'row row-cols-1 row-cols-md-2';
        tariffsContainer.style.position = 'relative';
        tariffsContainer.style.zIndex = '1';

        // Add event listener for cafe selection
        cafeSelect.addEventListener('change', async (e) => {
            const selectedCafeId = e.target.value;
            if (selectedCafeId) {
                const selectedCafe = allCafes.find(cafe => cafe._id === selectedCafeId);
                document.getElementById('selectedCafeName').textContent = selectedCafe.name;
                await loadTariffs(selectedCafeId);
                await checkActiveTariff(selectedCafeId);
            } else {
                document.getElementById('selectedCafeName').textContent = '';
                // If no cafe selected, show all tariffs
                await loadAllTariffs();
            }
        });

        // Load all tariffs initially
        await loadAllTariffs();

        // Create progress bar container
        const progressContainer = document.createElement('div');
        progressContainer.id = 'activeTariffProgress';
        progressContainer.className = 'mb-4';
        progressContainer.style.display = 'none';
        progressContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <div class="d-flex align-items-center mb-2">
                                <span class="badge bg-success me-2" id="activeTariffType"></span>
                                <span class="text-muted">Tugash sanasi: <span id="activeTariffEndDateHeader"></span></span>
                            </div>
                            <div class="tariff-info">
                                <h5 class="mb-1" style="color: #198754; font-weight: 600;" id="selectedCafeName"></h5>
                                <div class="d-flex align-items-center">
                                    <span class="fw-bold" id="activeTariffName" style="font-size: 1.1rem;"></span>
                                    <span class="ms-2 text-muted">tarifi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="progress" style="height: 12px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 0%"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-2">
                        <small class="text-muted">Boshlangan: <span id="activeTariffStartDate"></span></small>
                        <small class="text-muted">Tugaydi: <span id="activeTariffEndDate"></span></small>
                    </div>
                </div>
            </div>
        `;

        // Insert progress bar after dropdown
        cafeDropdownContainer.parentNode.insertBefore(progressContainer, cafeDropdownContainer.nextSibling);

    } catch (error) {
        console.error('Error loading initial data:', error);
        const tariffsContainer = document.getElementById('tariffsContainer');
        tariffsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Ma'lumotlar yuklanmadi. Iltimos, keyinroq qayta urinib ko'ring.</p>
                <p class="text-muted">Xatolik: ${error.message}</p>
            </div>
        `;
    } finally {
        toggleLoader(false);
    }
});

// Load all available tariffs
async function loadAllTariffs() {
    try {
        toggleLoader(true);
        const tariffsContainer = document.getElementById('tariffsContainer');
        // tariffsContainer.style.display = 'block';

        // Load all features first
        const featuresResponse = await fetch(`${API_URL}/api/features/get-all`);
        if (!featuresResponse.ok) {
            throw new Error('Failed to load features');
        }
        const allFeatures = await featuresResponse.json();

        // Load all available tariffs
        const response = await fetch(`${API_URL}/api/tariffs/get-all`);

        if (!response.ok) {
            throw new Error('Failed to load tariffs');
        }

        allTariffs = await response.json();
        
        if (!allTariffs || allTariffs.length === 0) {
            tariffsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-warning">Hozircha tariflar mavjud emas.</p>
                </div>
            `;
            return;
        }

        // Add custom styles for features
        const style = document.createElement('style');
        style.textContent = `
            .feature-list li.unavailable {
                opacity: 0.6;
            }
            .feature-list li.unavailable i {
                color: #dc3545 !important;
            }
            .feature-list li {
                padding: 8px 0;
                border-bottom: 1px solid rgba(0,0,0,0.05);
            }
            .feature-list li:last-child {
                border-bottom: none;
            }
            .feature-description {
                font-size: 0.8rem;
                color: #6c757d;
                margin-left: 1.7rem;
            }
        `;
        document.head.appendChild(style);

        tariffsContainer.innerHTML = allTariffs.map(tariff => {
            // Get the feature codes in this tariff
            const tariffFeatureCodes = tariff.features.map(f => f.code);
            
            // Create the features list with all features
            const featuresHtml = allFeatures.map(feature => {
                const isIncluded = tariffFeatureCodes.includes(feature.code);
                return `
                    <li class="mb-2 ${isIncluded ? '' : 'unavailable'}">
                        <i class="bx ${isIncluded ? 'bx-check-circle text-success' : 'bx-x-circle text-danger'} me-2"></i>
                        ${feature.name}
                        <div class="feature-description">${feature.description}</div>
                    </li>
                `;
            }).join('');

            return `
                <div class="col-md-4 col-lg-4 mb-5">
                    <div class="card tariff-card h-100 shadow-sm ${tariff.is_free_trial ? 'border-success' : ''}" 
                         data-tariff-id="${tariff._id}">
                        ${tariff.is_free_trial ? '<div class="card-ribbon"><span class="badge bg-success">14-Kunlik Bepul</span></div>' : ''}
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-center mb-4">${tariff.name}</h5>
                            <div class="pricing-section mb-4">
                                ${tariff.durations.daily ? `
                                    <div class="pricing-option text-center mb-3 p-2 rounded hover-highlight">
                                        <div class="price-amount">
                                            <span class="display-6">${tariff.durations.daily.price.toLocaleString()}</span>
                                            <small class="text-muted"> UZS</small>
                                        </div>
                                        <div class="price-period text-muted">
                                            ${tariff.durations.daily.duration} kun
                                        </div>
                                    </div>
                                ` : ''}
                                ${tariff.durations.monthly ? `
                                    <div class="pricing-option text-center mb-3 p-2 rounded hover-highlight">
                                        <div class="price-amount">
                                            <span class="display-6">${tariff.durations.monthly.price.toLocaleString()}</span>
                                            <small class="text-muted"> UZS</small>
                                        </div>
                                        <div class="price-period text-muted">
                                            ${tariff.durations.monthly.duration} oy
                                        </div>
                                    </div>
                                ` : ''}
                                ${tariff.durations.annual ? `
                                    <div class="pricing-option text-center mb-3 p-2 rounded hover-highlight">
                                        <div class="price-amount">
                                            <span class="display-6">${tariff.durations.annual.price.toLocaleString()}</span>
                                            <small class="text-muted"> UZS</small>
                                        </div>
                                        <div class="price-period text-muted">
                                            ${tariff.durations.annual.duration} yil
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="features-section flex-grow-1">
                                <h6 class="text-center mb-3">Imkoniyatlar:</h6>
                                <ul class="feature-list list-unstyled">
                                    ${featuresHtml}
                                </ul>
                            </div>
                            <div class="mt-4">
                                <button class="btn btn-primary w-100 select-tariff-btn" 
                                        data-tariff-id="${tariff._id}"
                                        ${tariff.is_free_trial ? 'data-is-free-trial="true"' : ''}>
                                    ${tariff.is_free_trial ? 'Bepul Sinab Ko`rish' : 'Tarifni tanlash'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to tariff selection buttons
        document.querySelectorAll('.select-tariff-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const tariffId = e.target.dataset.tariffId;
                const isFreeTrial = e.target.dataset.isFreeTrial === 'true';
                
                // Check if a cafe is selected
                const selectedCafeId = document.getElementById('cafe-select').value;
                if (!selectedCafeId) {
                    alert('Iltimos, avval kafeni tanlang');
                    return;
                }
                
                await selectTariff(tariffId, isFreeTrial, selectedCafeId);
            });
        });

    } catch (error) {
        console.error('Error loading tariffs:', error);
        const tariffsContainer = document.getElementById('tariffsContainer');
        tariffsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Tariflar yuklanmadi. Iltimos, keyinroq qayta urinib ko'ring.</p>
            </div>
        `;
    } finally {
        toggleLoader(false);
    }
}

// Load tariffs for selected cafe
async function loadTariffs(cafeId) {
    try {
        toggleLoader(true);
        const tariffsContainer = document.getElementById('tariffsContainer');
        // tariffsContainer.style.display = 'block';

        // Load all features first
        const featuresResponse = await fetch(`${API_URL}/api/features/get-all`);
        if (!featuresResponse.ok) {
            throw new Error('Failed to load features');
        }
        const allFeatures = await featuresResponse.json();

        // First check for active tariff
        const activeTariffResponse = await fetch(`${API_URL}/api/tariffs/check-kafe-tariff/${cafeId}`, {
            headers: getAuthHeaders()
        });

        let activeTariffData = null;
        if (activeTariffResponse.ok) {
            const responseData = await activeTariffResponse.json();
            if (responseData.subscription) {
                activeTariffData = responseData.subscription;
            }
        }

        // Load all available tariffs
        const response = await fetch(`${API_URL}/api/tariffs/get-all`);

        if (!response.ok) {
            throw new Error('Failed to load tariffs');
        }

        allTariffs = await response.json();
        
        if (!allTariffs || allTariffs.length === 0) {
            tariffsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-warning">Hozircha tariflar mavjud emas.</p>
                </div>
            `;
            return;
        }

        // Add custom styles for features and active tariff
        const style = document.createElement('style');
        style.textContent = `
            .feature-list li.unavailable {
                opacity: 0.6;
            }
            .feature-list li.unavailable i {
                color: #dc3545 !important;
            }
            .feature-list li {
                padding: 8px 0;
                border-bottom: 1px solid rgba(0,0,0,0.05);
            }
            .feature-list li:last-child {
                border-bottom: none;
            }
            .feature-description {
                font-size: 0.8rem;
                color: #6c757d;
                margin-left: 1.7rem;
            }
            .tariff-card.active {
                border: 2px solid #198754 !important;
                background-color: rgba(25, 135, 84, 0.05);
            }
            .active-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                z-index: 2;
                background-color: #198754;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
            }
        `;
        document.head.appendChild(style);

        tariffsContainer.innerHTML = allTariffs.map(tariff => {
            const isActive = activeTariffData && activeTariffData.tariff_id._id === tariff._id;
            let endDate = '';
            if (isActive) {
                const date = new Date(activeTariffData.end_date);
                endDate = date.toLocaleDateString('uz-UZ');
            }

            // Get the feature codes in this tariff
            const tariffFeatureCodes = tariff.features.map(f => f.code);
            
            // Create the features list with all features
            const featuresHtml = allFeatures.map(feature => {
                const isIncluded = tariffFeatureCodes.includes(feature.code);
                return `
                    <li class="mb-2 ${isIncluded ? '' : 'unavailable'}">
                        <i class="bx ${isIncluded ? 'bx-check-circle text-success' : 'bx-x-circle text-danger'} me-2"></i>
                        ${feature.name}
                        <div class="feature-description">${feature.description}</div>
                    </li>
                `;
            }).join('');
            
            return `
                <div class="col-md-4 col-lg-4 mb-5">
                    <div class="card tariff-card h-100 shadow-sm ${isActive ? 'active' : ''} ${tariff.is_free_trial ? 'border-success' : ''}" 
                         data-tariff-id="${tariff._id}">
                        ${isActive ? `<div class="active-badge">Faol tarif (${endDate} gacha)</div>` : ''}
                        ${(!isActive && tariff.is_free_trial) ? '<div class="card-ribbon"><span class="badge bg-success">14-Kunlik Bepul</span></div>' : ''}
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-center mb-4">${tariff.name}</h5>
                            <div class="pricing-section mb-4">
                                ${tariff.durations.daily ? `
                                    <div class="pricing-option text-center mb-3 p-2 rounded hover-highlight">
                                        <div class="price-amount">
                                            <span class="display-6">${tariff.durations.daily.price.toLocaleString()}</span>
                                            <small class="text-muted"> UZS</small>
                                        </div>
                                        <div class="price-period text-muted">
                                            ${tariff.durations.daily.duration} kun
                                        </div>
                                    </div>
                                ` : ''}
                                ${tariff.durations.monthly ? `
                                    <div class="pricing-option text-center mb-3 p-2 rounded hover-highlight">
                                        <div class="price-amount">
                                            <span class="display-6">${tariff.durations.monthly.price.toLocaleString()}</span>
                                            <small class="text-muted"> UZS</small>
                                        </div>
                                        <div class="price-period text-muted">
                                            ${tariff.durations.monthly.duration} oy
                                        </div>
                                    </div>
                                ` : ''}
                                ${tariff.durations.annual ? `
                                    <div class="pricing-option text-center mb-3 p-2 rounded hover-highlight">
                                        <div class="price-amount">
                                            <span class="display-6">${tariff.durations.annual.price.toLocaleString()}</span>
                                            <small class="text-muted"> UZS</small>
                                        </div>
                                        <div class="price-period text-muted">
                                            ${tariff.durations.annual.duration} yil
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="features-section flex-grow-1">
                                <h6 class="text-center mb-3">Imkoniyatlar:</h6>
                                <ul class="feature-list list-unstyled">
                                    ${featuresHtml}
                                </ul>
                            </div>
                            <div class="mt-4">
                                <button class="btn ${isActive ? 'btn-success' : 'btn-primary'} w-100 select-tariff-btn" 
                                        data-tariff-id="${tariff._id}"
                                        ${tariff.is_free_trial ? 'data-is-free-trial="true"' : ''}
                                        ${isActive ? 'disabled' : ''}>
                                    ${isActive ? 'Faol Tarif' : (tariff.is_free_trial ? 'Bepul Sinab Ko`rish' : 'Tarifni tanlash')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Add event listeners to tariff selection buttons
        document.querySelectorAll('.select-tariff-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const tariffId = e.target.dataset.tariffId;
                const isFreeTrial = e.target.dataset.isFreeTrial === 'true';
                await selectTariff(tariffId, isFreeTrial, cafeId);
            });
        });

    } catch (error) {
        console.error('Error loading tariffs:', error);
        const tariffsContainer = document.getElementById('tariffsContainer');
        tariffsContainer.innerHTML = `
            <div class="col-12 text-center">
                <p class="text-danger">Tariflar yuklanmadi. Iltimos, keyinroq qayta urinib ko'ring.</p>
            </div>
        `;
    } finally {
        toggleLoader(false);
    }
}

// Add confirm button event listener
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for confirm button
    document.getElementById('confirmSelectionBtn').addEventListener('click', async () => {
        if (!currentSelectedTariff) {
            alert('Iltimos, tarifni tanlang');
            return;
        }

        const selectedBillingPeriod = document.querySelector('input[name="billingPeriod"]:checked');
        if (!selectedBillingPeriod) {
            alert('Iltimos, to\'lov turini tanlang');
            return;
        }

        const selectedCafeId = document.getElementById('cafe-select').value;
        if (!selectedCafeId) {
            alert('Iltimos, kafeni tanlang');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/tariffs/select-tariff`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    tariff_id: currentSelectedTariff._id,
                    payment_type: selectedBillingPeriod.value,
                    kafe_id: selectedCafeId
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Tarif tanlashda xatolik yuz berdi');
            }

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('selectedTariffModal'));
            modal.hide();

            // Show success message
            alert(result.message || 'Tarif muvaffaqiyatli tanlandi');

            // Refresh tariffs display
            await loadTariffs(selectedCafeId);
            await checkActiveTariff(selectedCafeId);

        } catch (error) {
            console.error('Error selecting tariff:', error);
            alert(error.message || 'Tarif tanlashda xatolik yuz berdi. Iltimos, qayta urinib ko\'ring.');
        }
    });
});

// Select a tariff
async function selectTariff(tariffId, isFreeTrial, cafeId) {
    try {
        toggleLoader(true);
        // Load all tariffs to get the selected one
        const response = await fetch(`${API_URL}/api/tariffs/get-all`);

        if (!response.ok) {
            throw new Error('Failed to load tariff details');
        }

        const tariffs = await response.json();
        const tariff = tariffs.find(t => t._id === tariffId);

        if (!tariff) {
            throw new Error('Tariff not found');
        }

        // Get selected cafe name and update it in progress bar
        const selectedCafe = allCafes.find(cafe => cafe._id === cafeId);
        if (selectedCafe) {
            document.getElementById('selectedCafeName').textContent = selectedCafe.name;
        }

        currentSelectedTariff = tariff;
            
        // Update modal content
        document.getElementById('selectedTariffName').textContent = tariff.name;
        
        // Populate billing options
        const billingOptions = document.getElementById('billingOptions');
        billingOptions.innerHTML = '';
        
        if (tariff.durations.daily) {
            billingOptions.innerHTML += `
                <div class="billing-option">
                    <input type="radio" name="billingPeriod" id="daily" value="daily">
                    <label for="daily">
                        <div class="price">${tariff.durations.daily.price.toLocaleString()} UZS</div>
                    <div class="duration">${tariff.durations.daily.duration} kun</div>
                    </label>
                </div>
            `;
        }
        
        if (tariff.durations.monthly) {
            billingOptions.innerHTML += `
                <div class="billing-option">
                    <input type="radio" name="billingPeriod" id="monthly" value="monthly">
                    <label for="monthly">
                        <div class="price">${tariff.durations.monthly.price.toLocaleString()} UZS</div>
                    <div class="duration">${tariff.durations.monthly.duration} oy</div>
                    </label>
                </div>
            `;
        }
        
        if (tariff.durations.annual) {
            billingOptions.innerHTML += `
                <div class="billing-option">
                <input type="radio" name="billingPeriod" id="yearly" value="yearly">
                <label for="yearly">
                        <div class="price">${tariff.durations.annual.price.toLocaleString()} UZS</div>
                    <div class="duration">${tariff.durations.annual.duration} yil</div>
                    </label>
                </div>
            `;
        }

        // Add event listeners to billing options
        document.querySelectorAll('.billing-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.billing-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                this.querySelector('input[type="radio"]').checked = true;
            });
        });

        // Show/hide free trial info
        const freeTrialInfo = document.getElementById('freeTrialInfo');
        freeTrialInfo.style.display = isFreeTrial ? 'block' : 'none';

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('selectedTariffModal'));
        modal.show();
    } catch (error) {
        console.error('Error loading tariff:', error);
        alert('Tarif yuklanmadi. Iltimos, keyinroq qayta urinib ko\'ring.');
    } finally {
        toggleLoader(false);
    }
}

// Check for active tariff
async function checkActiveTariff(cafeId) {
    try {
        const response = await fetch(`${API_URL}/api/tariffs/check-kafe-tariff/${cafeId}`, {
            headers: getAuthHeaders()
        });

        if (response.ok) {
            const data = await response.json();
            if (data.subscription) {
                const subscription = data.subscription;
                const tariff = subscription.tariff_id;
                const startDate = new Date(subscription.start_date);
                const endDate = new Date(subscription.end_date);
                const now = new Date();

                // Calculate progress
                const totalDuration = endDate - startDate;
                const elapsedDuration = now - startDate;
                const progress = (elapsedDuration / totalDuration) * 100;

                // Get selected cafe name
                const selectedCafe = allCafes.find(cafe => cafe._id === cafeId);
                const cafeName = selectedCafe ? selectedCafe.name : '';

                // Update UI
                document.getElementById('activeTariffProgress').style.display = 'block';
                document.getElementById('selectedCafeName').textContent = cafeName;
                document.getElementById('activeTariffName').textContent = tariff.name;
                document.getElementById('activeTariffType').textContent = subscription.payment_type.toUpperCase();
                
                // Format dates
                const startDateStr = startDate.toLocaleDateString();
                const endDateStr = endDate.toLocaleDateString();
                document.getElementById('activeTariffStartDate').textContent = startDateStr;
                document.getElementById('activeTariffEndDate').textContent = endDateStr;
                document.getElementById('activeTariffEndDateHeader').textContent = endDateStr;

                // Update progress bar
                const progressBar = document.querySelector('#activeTariffProgress .progress-bar');
                progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;

                // Update progress every minute
                setInterval(() => {
                    const now = new Date();
                    const elapsedDuration = now - startDate;
                    const progress = (elapsedDuration / totalDuration) * 100;
                    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
                }, 60000);
            } else {
                document.getElementById('activeTariffProgress').style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error checking active tariff:', error);
    }
}