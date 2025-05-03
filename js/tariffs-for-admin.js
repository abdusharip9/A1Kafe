import { API_URL } from './api-url.js'
import { getAuthHeaders, isAuthenticated } from './verify-token.js'

let currentDeleteId = null;
let currentDeleteType = null; // 'feature' or 'tariff'

// Initialize Select2 for feature selection
function initializeSelect2() {
	$('.features-select').select2({
		theme: 'bootstrap-5',
		width: '100%',
		placeholder: 'Select features...',
		allowClear: true,
		closeOnSelect: false,
		tags: false,
		multiple: true,
		dropdownParent: $('#addTariffModal, #editTariffModal'),
		language: {
			noResults: function() {
				return "No features found";
			},
			searching: function() {
				return "Searching...";
			}
		},
		templateResult: formatFeatureOption,
		templateSelection: formatFeatureSelection
	});
}

// Format feature option in dropdown
function formatFeatureOption(feature) {
	if (!feature.id) return feature.text;
	return $('<span><i class="bi bi-check-circle me-2"></i>' + feature.text + '</span>');
}

// Format selected feature
function formatFeatureSelection(feature) {
	if (!feature.id) return feature.text;
	return $('<span><i class="bi bi-check-circle-fill me-2"></i>' + feature.text + '</span>');
}

// Initialize delete confirmation modal and Select2
document.addEventListener('DOMContentLoaded', () => {
	const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
	const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

	confirmDeleteBtn.addEventListener('click', async () => {
		if (currentDeleteType === 'feature') {
			await deleteFeature(currentDeleteId);
		} else if (currentDeleteType === 'tariff') {
			await deleteTariff(currentDeleteId);
		}
		deleteModal.hide();
	});

	// Initialize Select2 after the page loads
	initializeSelect2();
});

// Fetch and display features
async function loadFeatures() {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	try {
		const response = await fetch(`${API_URL}/api/features/get-all`, {
			headers: getAuthHeaders()
		});
		
		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		const features = await response.json();
		
		// Populate features table
		const featuresTableBody = document.getElementById('featuresTableBody');
		featuresTableBody.innerHTML = features.map(feature => `
			<tr>
				<td>${feature.name}</td>
				<td>${feature.code}</td>
				<td>${feature.description}</td>
				<td>
					<div class="btn-group">
						<button class="btn btn-primary btn-sm" onclick="showEditFeatureModal('${feature._id}')">
							<i class="bi bi-pencil"></i>
						</button>
						<button class="btn btn-danger btn-sm" onclick="showDeleteConfirmation('feature', '${feature._id}')">
							<i class="bi bi-trash"></i>
						</button>
					</div>
				</td>
			</tr>
		`).join('');

		// Populate features select in tariff forms
		const featuresSelects = document.querySelectorAll('.features-select');
		featuresSelects.forEach(select => {
			// Clear existing options
			select.innerHTML = '';
			
			// Add new options
			features.forEach(feature => {
				const option = document.createElement('option');
				option.value = feature._id;
				option.textContent = feature.name;
				select.appendChild(option);
			});

			// Reinitialize Select2
			$(select).trigger('change');
		});
	} catch (error) {
		console.error('Error loading features:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Fetch and display tariffs
async function loadTariffs() {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	try {
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
			<div class="col-md-6 mb-4">
				<div class="card h-100">
					<div class="card-body">
						<div class="d-flex justify-content-between align-items-start">
							<div>
								<h5 class="card-title">${tariff.name}</h5>
								<p class="text-muted mb-3">${tariff.description}</p>
							</div>
							<div class="btn-group">
								<button class="btn btn-primary btn-sm" onclick="showEditTariffModal('${tariff._id}')">
									<i class="bi bi-pencil"></i>
								</button>
								<button class="btn btn-danger btn-sm" onclick="showDeleteConfirmation('tariff', '${tariff._id}')">
									<i class="bi bi-trash"></i>
								</button>
							</div>
						</div>
						<div class="mb-3">
							<h6>Narxlar:</h6>
							${tariff.durations.daily ? `
								<p>Kunlik: ${tariff.durations.daily.price.toLocaleString()} UZS - ${tariff.durations.daily.duration} kun</p>
							` : ''}
							${tariff.durations.monthly ? `
								<p>Oylik: ${tariff.durations.monthly.price.toLocaleString()} UZS - ${tariff.durations.monthly.duration} oy</p>
							` : ''}
							${tariff.durations.annual ? `
								<p>Yillik: ${tariff.durations.annual.price.toLocaleString()} UZS - ${tariff.durations.annual.duration} yil</p>
							` : ''}
						</div>
						<div class="mb-3">
							<h6>Imkoniyatlar:</h6>
							<ul class="list-unstyled">
								${tariff.features.map(feature => `
									<li><i class="bi bi-check-circle-fill text-success"></i> ${feature.name}</li>
								`).join('')}
							</ul>
						</div>
						${tariff.is_free_trial ? '<span class="badge bg-success">Bepul Sinov Mavjud</span>' : ''}
					</div>
				</div>
			</div>
		`).join('');
	} catch (error) {
		console.error('Error loading tariffs:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Show edit feature modal
async function showEditFeatureModal(featureId) {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	try {
		const response = await fetch(`${API_URL}/api/features/get-all`, {
			headers: getAuthHeaders()
		});

		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		const features = await response.json();
		const feature = features.find(f => f._id === featureId);

		if (feature) {
			const form = document.getElementById('editFeatureForm');
			form.id.value = feature._id;
			form.name.value = feature.name;
			form.code.value = feature.code;
			form.description.value = feature.description;

			const modal = new bootstrap.Modal(document.getElementById('editFeatureModal'));
			modal.show();
		}
	} catch (error) {
		console.error('Error loading feature:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Show edit tariff modal
async function showEditTariffModal(tariffId) {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

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
			const form = document.getElementById('editTariffForm');
			form.id.value = tariff._id;
			form.name.value = tariff.name;
			
			// Set billing period checkboxes and values
			if (tariff.durations.daily) {
				form.enableDaily.checked = true;
				form.dailyPrice.value = tariff.durations.daily.price;
				form.dailyDuration.value = tariff.durations.daily.duration;
				document.querySelector('.daily-billing').style.display = 'flex';
			}
			
			if (tariff.durations.monthly) {
				form.enableMonthly.checked = true;
				form.monthlyPrice.value = tariff.durations.monthly.price;
				form.monthlyDuration.value = tariff.durations.monthly.duration;
				document.querySelector('.monthly-billing').style.display = 'flex';
			}
			
			if (tariff.durations.annual) {
				form.enableAnnual.checked = true;
				form.annualPrice.value = tariff.durations.annual.price;
				form.annualDuration.value = tariff.durations.annual.duration;
				document.querySelector('.annual-billing').style.display = 'flex';
			}
			
			document.getElementById('editIsFreeTrial').checked = tariff.is_free_trial;

			// Set selected features using Select2
			const featuresSelect = form.features;
			const selectedFeatures = tariff.features.map(f => f._id);
			$(featuresSelect).val(selectedFeatures).trigger('change');

			const modal = new bootstrap.Modal(document.getElementById('editTariffModal'));
			modal.show();
		}
	} catch (error) {
		console.error('Error loading tariff:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Update feature
async function updateFeature() {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	const form = document.getElementById('editFeatureForm');
	const formData = {
		name: form.name.value,
		code: form.code.value,
		description: form.description.value
	};

	try {
		const response = await fetch(`${API_URL}/api/features/update/${form.id.value}`, {
			method: 'PUT',
			headers: getAuthHeaders(),
			body: JSON.stringify(formData)
		});

		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		if (response.ok) {
			loadFeatures();
			bootstrap.Modal.getInstance(document.getElementById('editFeatureModal')).hide();
		}
	} catch (error) {
		console.error('Error updating feature:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Update tariff
async function updateTariff() {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	const form = document.getElementById('editTariffForm');
	const selectedFeatures = $(form.features).val();
	
	const durations = {};
	
	if (form.enableDaily.checked) {
		durations.daily = {
			duration: parseInt(form.dailyDuration.value),
			price: parseInt(form.dailyPrice.value)
		};
	}
	
	if (form.enableMonthly.checked) {
		durations.monthly = {
			duration: parseInt(form.monthlyDuration.value),
			price: parseInt(form.monthlyPrice.value)
		};
	}
	
	if (form.enableAnnual.checked) {
		durations.annual = {
			duration: parseInt(form.annualDuration.value),
			price: parseInt(form.annualPrice.value)
		};
	}
	
	const formData = {
		name: form.name.value,
		durations: durations,
		features: selectedFeatures,
		is_free_trial: document.getElementById('editIsFreeTrial').checked
	};

	try {
		const response = await fetch(`${API_URL}/api/tariffs/update/${form.id.value}`, {
			method: 'PUT',
			headers: getAuthHeaders(),
			body: JSON.stringify(formData)
		});

		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		if (response.ok) {
			loadTariffs();
			bootstrap.Modal.getInstance(document.getElementById('editTariffModal')).hide();
		}
	} catch (error) {
		console.error('Error updating tariff:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Delete feature
async function deleteFeature(featureId) {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	try {
		const response = await fetch(`${API_URL}/api/features/delete/${featureId}`, {
			method: 'DELETE',
			headers: getAuthHeaders()
		});

		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		if (response.ok) {
			loadFeatures();
		}
	} catch (error) {
		console.error('Error deleting feature:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Delete tariff
async function deleteTariff(tariffId) {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	try {
		const response = await fetch(`${API_URL}/api/tariffs/delete/${tariffId}`, {
			method: 'DELETE',
			headers: getAuthHeaders()
		});

		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		if (response.ok) {
			loadTariffs();
		}
	} catch (error) {
		console.error('Error deleting tariff:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Show delete confirmation modal
function showDeleteConfirmation(type, id) {
	currentDeleteType = type;
	currentDeleteId = id;
	const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
	deleteModal.show();
}

// Create new feature
async function createFeature() {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	const form = document.getElementById('addFeatureForm');
	const formData = {
		name: form.name.value,
		code: form.code.value,
		description: form.description.value
	};

	try {
		const response = await fetch(`${API_URL}/api/features/create`, {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(formData)
		});

		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		if (response.ok) {
			loadFeatures();
			bootstrap.Modal.getInstance(document.getElementById('addFeatureModal')).hide();
			form.reset();
		}
	} catch (error) {
		console.error('Error creating feature:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Create new tariff
async function createTariff() {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}

	const form = document.getElementById('addTariffForm');
	const selectedFeatures = $(form.features).val();
	
	const durations = {};
	
	if (form.enableDaily.checked) {
		durations.daily = {
			duration: parseInt(form.dailyDuration.value),
			price: parseInt(form.dailyPrice.value)
		};
	}
	
	if (form.enableMonthly.checked) {
		durations.monthly = {
			duration: parseInt(form.monthlyDuration.value),
			price: parseInt(form.monthlyPrice.value)
		};
	}
	
	if (form.enableAnnual.checked) {
		durations.annual = {
			duration: parseInt(form.annualDuration.value),
			price: parseInt(form.annualPrice.value)
		};
	}
	
	const formData = {
		name: form.name.value,
		durations: durations,
		features: selectedFeatures,
		is_free_trial: document.getElementById('isFreeTrial').checked
	};

	try {
		const response = await fetch(`${API_URL}/api/tariffs/create`, {
			method: 'POST',
			headers: getAuthHeaders(),
			body: JSON.stringify(formData)
		});

		if (response.status === 401) {
			window.location.href = '/login.html';
			return;
		}

		const result = await response.json();

		if (response.ok) {
			// Show success message
			const successAlert = document.createElement('div');
			successAlert.className = 'alert alert-success alert-dismissible fade show';
			successAlert.role = 'alert';
			successAlert.innerHTML = `
				${result.message}
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			`;
			
			// Insert alert at the top of the container
			const container = document.querySelector('.container');
			container.insertBefore(successAlert, container.firstChild);
			
			// Remove alert after 5 seconds
			setTimeout(() => {
				successAlert.remove();
			}, 5000);

			// Reset form and close modal
			loadTariffs();
			bootstrap.Modal.getInstance(document.getElementById('addTariffModal')).hide();
			form.reset();
			$(form.features).val(null).trigger('change');
		} else {
			// Show error message
			const errorAlert = document.createElement('div');
			errorAlert.className = 'alert alert-danger alert-dismissible fade show';
			errorAlert.role = 'alert';
			errorAlert.innerHTML = `
				${result.message || 'Error creating tariff'}
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			`;
			
			// Insert alert at the top of the container
			const container = document.querySelector('.container');
			container.insertBefore(errorAlert, container.firstChild);
			
			// Remove alert after 5 seconds
			setTimeout(() => {
				errorAlert.remove();
			}, 5000);
		}
	} catch (error) {
		console.error('Error creating tariff:', error);
		if (error.message === 'No access token found') {
			window.location.href = '/login.html';
		}
	}
}

// Initialize billing period toggles
function initializeBillingPeriodToggles() {
	const dailyCheckbox = document.getElementById('enableDaily');
	const monthlyCheckbox = document.getElementById('enableMonthly');
	const annualCheckbox = document.getElementById('enableAnnual');

	dailyCheckbox.addEventListener('change', function() {
		document.querySelector('.daily-billing').style.display = this.checked ? 'flex' : 'none';
		document.querySelector('input[name="dailyPrice"]').required = this.checked;
		document.querySelector('input[name="dailyDuration"]').required = this.checked;
	});

	monthlyCheckbox.addEventListener('change', function() {
		document.querySelector('.monthly-billing').style.display = this.checked ? 'flex' : 'none';
		document.querySelector('input[name="monthlyPrice"]').required = this.checked;
		document.querySelector('input[name="monthlyDuration"]').required = this.checked;
	});

	annualCheckbox.addEventListener('change', function() {
		document.querySelector('.annual-billing').style.display = this.checked ? 'flex' : 'none';
		document.querySelector('input[name="annualPrice"]').required = this.checked;
		document.querySelector('input[name="annualDuration"]').required = this.checked;
	});
}

// Make functions available globally
window.createFeature = createFeature;
window.createTariff = createTariff;
window.showDeleteConfirmation = showDeleteConfirmation;
window.showEditFeatureModal = showEditFeatureModal;
window.showEditTariffModal = showEditTariffModal;
window.updateFeature = updateFeature;
window.updateTariff = updateTariff;

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
	if (!isAuthenticated()) {
		window.location.href = '/login.html';
		return;
	}
	initializeBillingPeriodToggles();
	loadFeatures();
	loadTariffs();
});