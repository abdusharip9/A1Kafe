import { API_URL } from './api-url.js'
import { getAuthHeaders, isAuthenticated } from './verify-token.js'

// Check if user is authenticated
if (!isAuthenticated()) {
    window.location.href = '/login.html';
}

let currentSelectedTariff = null;

// Load tariffs and user's current tariff
document.addEventListener('DOMContentLoaded', async () => {
    await loadTariffs();
    await checkFreeTrial();
    await checkActiveTariff();
});

// Load all available tariffs
async function loadTariffs() {
    try {
        // First check for active tariff
        const activeTariffResponse = await fetch(`${API_URL}/api/tariffs/check-user-tariff`, {
            headers: getAuthHeaders()
        });

        let activeTariffId = null;
        if (activeTariffResponse.ok) {
            const activeTariffData = await activeTariffResponse.json();
            if (activeTariffData.subscription) {
                activeTariffId = activeTariffData.subscription.tariff_id._id;
            }
        }

        // Then load all tariffs
        const response = await fetch(`${API_URL}/api/tariffs/get-all`, {
            headers: getAuthHeaders()
        });

        if (response.status === 401) {
            window.location.href = '/login.html';
            return;
        }

        const tariffs = await response.json();
        const tariffsContainer = document.getElementById('tariffsContainer');
        
        tariffsContainer.innerHTML = tariffs.map(tariff => `
            <div class="col-md-4 mb-4">
                <div class="card tariff-card h-100 ${tariff.is_free_trial ? 'border-success' : ''} ${tariff._id === activeTariffId ? 'selected' : ''}" 
                     data-tariff-id="${tariff._id}">
                    ${tariff.is_free_trial ? '<span class="free-trial-badge">14-Day Free Trial</span>' : ''}
                    <div class="card-body">
                        <h5 class="card-title">${tariff.name}</h5>
                        <div class="mb-3">
                            ${tariff.durations.daily ? `
                                <div class="mb-2">
                                    <span class="price">${tariff.durations.daily.price.toLocaleString()} UZS</span>
                                    <span class="price-period">/day</span>
                                    <small class="d-block text-muted">${tariff.durations.daily.duration} days</small>
                                </div>
                            ` : ''}
                            ${tariff.durations.monthly ? `
                                <div class="mb-2">
                                    <span class="price">${tariff.durations.monthly.price.toLocaleString()} UZS</span>
                                    <span class="price-period">/month</span>
                                    <small class="d-block text-muted">${tariff.durations.monthly.duration} months</small>
                                </div>
                            ` : ''}
                            ${tariff.durations.annual ? `
                                <div class="mb-2">
                                    <span class="price">${tariff.durations.annual.price.toLocaleString()} UZS</span>
                                    <span class="price-period">/year</span>
                                    <small class="d-block text-muted">${tariff.durations.annual.duration} years</small>
                                </div>
                            ` : ''}
                        </div>
                        <h6>Features:</h6>
                        <ul class="feature-list">
                            ${tariff.features.map(feature => `
                                <li><i class="bx bx-check"></i>${feature.name}</li>
                            `).join('')}
                        </ul>
                        <div class="mt-3">
                            <button class="btn btn-primary w-100 select-tariff-btn" 
                                    data-tariff-id="${tariff._id}"
                                    ${tariff.is_free_trial ? 'data-is-free-trial="true"' : ''}
                                    ${tariff._id === activeTariffId ? 'disabled' : ''}>
                                ${tariff._id === activeTariffId ? 'Active Tariff' : (tariff.is_free_trial ? 'Bepul Sinab Ko`rish' : 'Tarifni tanlash')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners to tariff selection buttons
        document.querySelectorAll('.select-tariff-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const tariffId = e.target.dataset.tariffId;
                const isFreeTrial = e.target.dataset.isFreeTrial === 'true';
                await selectTariff(tariffId, isFreeTrial);
            });
        });
    } catch (error) {
        console.error('Error loading tariffs:', error);
    }
}

// Select a tariff
async function selectTariff(tariffId, isFreeTrial) {
    try {
        const response = await fetch(`${API_URL}/api/tariffs/get-all`, {
            headers: getAuthHeaders()
        });

        if (response.status === 401) {
            window.location.href = '/login.html';
            return;
        }

        const tariffs = await response.json();
        const tariff = tariffs.find(t => t._id === tariffId);

        if (tariff) {
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
                            <div class="duration">${tariff.durations.daily.duration} days</div>
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
                            <div class="duration">${tariff.durations.monthly.duration} months</div>
                        </label>
                    </div>
                `;
            }
            
            if (tariff.durations.annual) {
                billingOptions.innerHTML += `
                    <div class="billing-option">
                        <input type="radio" name="billingPeriod" id="annual" value="annual">
                        <label for="annual">
                            <div class="price">${tariff.durations.annual.price.toLocaleString()} UZS</div>
                            <div class="duration">${tariff.durations.annual.duration} years</div>
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
            freeTrialInfo.style.display = 'none';

            // Show modal
            const modal = new bootstrap.Modal(document.getElementById('selectedTariffModal'));
            modal.show();
        }
    } catch (error) {
        console.error('Error loading tariff:', error);
    }
}

// Confirm tariff selection
async function confirmTariffSelection() {
    if (!currentSelectedTariff) return;

    const selectedBillingPeriod = document.querySelector('input[name="billingPeriod"]:checked');
    if (!selectedBillingPeriod) {
        alert('Please select a billing period');
        return;
    }

    const billingPeriod = selectedBillingPeriod.value;
    
    try {
        const response = await fetch(`${API_URL}/api/tariffs/select-tariff`, {
            method: 'POST',
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tariff_id: currentSelectedTariff._id,
                payment_type: billingPeriod
            })
        });

        if (response.status === 401) {
            window.location.href = '/login.html';
            return;
        }

        const result = await response.json();

        if (response.ok) {
            // Show success message
            const modal = bootstrap.Modal.getInstance(document.getElementById('selectedTariffModal'));
            modal.hide();

            // If it's a free trial, show the progress bar
            // if (currentSelectedTariff.is_free_trial) {
            //     document.getElementById('freeTrialProgress').style.display = 'block';
            //     startFreeTrialProgress();
            // }

            // Update UI to show selected tariff
            document.querySelectorAll('.tariff-card').forEach(card => {
                card.classList.remove('selected');
                if (card.dataset.tariffId === currentSelectedTariff._id) {
                    card.classList.add('selected');
                }
            });

            // Show success message
            alert('Tariff selected successfully!');
        } else {
            // Show error message
            alert(result.message || 'Error selecting tariff');
        }
    } catch (error) {
        console.error('Error selecting tariff:', error);
        alert('Error selecting tariff. Please try again.');
    }
}

// Check if user is on free trial
async function checkFreeTrial() {
    try {
        const response = await fetch(`${API_URL}/api/tariffs/check-free-trial`, {
            headers: getAuthHeaders()
        });

        if (response.ok) {
            const data = await response.json();
            if (data.isOnFreeTrial) {
                document.getElementById('freeTrialProgress').style.display = 'block';
                updateFreeTrialProgress(data.daysRemaining);
            }
        }
    } catch (error) {
        console.error('Error checking free trial:', error);
    }
}

// Update free trial progress
function updateFreeTrialProgress(daysRemaining) {
    const progressBar = document.querySelector('#freeTrialProgress .progress-bar');
    const daysRemainingElement = document.getElementById('daysRemaining');
    
    const progress = ((14 - daysRemaining) / 14) * 100;
    progressBar.style.width = `${progress}%`;
    daysRemainingElement.textContent = daysRemaining;
}

// Start free trial progress animation
function startFreeTrialProgress() {
    updateFreeTrialProgress(14);
    
    // Update progress every day
    setInterval(() => {
        const daysRemaining = parseInt(document.getElementById('daysRemaining').textContent);
        if (daysRemaining > 0) {
            updateFreeTrialProgress(daysRemaining - 1);
        }
    }, 24 * 60 * 60 * 1000); // Update every 24 hours
}

// Check for active tariff
async function checkActiveTariff() {
    try {
        const response = await fetch(`${API_URL}/api/tariffs/check-user-tariff`, {
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

                // Update UI
                document.getElementById('activeTariffProgress').style.display = 'block';
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
            }
        }
    } catch (error) {
        console.error('Error checking active tariff:', error);
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for confirm button
    document.getElementById('confirmSelectionBtn').addEventListener('click', confirmTariffSelection);

    // Load tariffs and check free trial status
    loadTariffs();
    checkFreeTrial();
    checkActiveTariff();
}); 