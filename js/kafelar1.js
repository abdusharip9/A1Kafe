import { API_URL } from './api-url.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  const userData = await verify();
  const userId = userData.userDto.id;
  const tBody = document.querySelector('#kafesTableBody');
  const logoutBtn = document.querySelector('#logoutBtn');
  const copyPasswordBtn = document.getElementById('copy-password-btn');
  const viewPasswordModal = new bootstrap.Modal(document.getElementById('viewPasswordModal'));
	const deleteCafeModal = new bootstrap.Modal(document.getElementById('deleteCafeModal'));
	const confirmDeleteBtn = document.getElementById('confirm-delete-btn');


	confirmDeleteBtn.addEventListener('click', handleDeleteCafe);

  // Logout
  logoutBtn.addEventListener('click', logout);

  // Add open app modal HTML
  document.body.insertAdjacentHTML('beforeend', `
      <div class="modal fade" id="openAppModal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Ilovaga kirish ma'lumotlari</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body">
                      <div class="mb-3">
                          <label class="form-label">Login</label>
                          <div class="input-group">
                              <input type="text" class="form-control" id="appLoginField" readonly>
                              <button class="btn btn-outline-secondary" type="button" onclick="copyToClipboard('appLoginField')">
                                  <i class="bx bx-copy"></i>
                              </button>
                          </div>
                      </div>
                      <div class="mb-3">
                          <label class="form-label">Parol</label>
                          <div class="input-group">
                              <input type="text" class="form-control" id="appPasswordField" readonly>
                              <button class="btn btn-outline-secondary" type="button" onclick="copyToClipboard('appPasswordField')">
                                  <i class="bx bx-copy"></i>
                              </button>
                          </div>
                      </div>
                      <div id="openAppLoader" class="text-center" style="display: none;">
                          <div class="spinner-border text-primary" role="status">
                              <span class="visually-hidden">Yuklanmoqda...</span>
                          </div>
                          <div class="mt-2">Iltimos kuting...</div>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                      <button type="button" class="btn btn-primary" id="openAppBtn">
                          <i class="bi bi-box-arrow-up-right"></i> Ilovani ochish
                      </button>
                  </div>
              </div>
          </div>
      </div>
  `);

  // Add copy to clipboard function
  window.copyToClipboard = function(elementId) {
      const element = document.getElementById(elementId);
      element.select();
      navigator.clipboard.writeText(element.value).then(() => {
          // Show success feedback
          const button = element.nextElementSibling;
          const originalHTML = button.innerHTML;
          button.innerHTML = '<i class="bx bx-check"></i>';
          setTimeout(() => {
              button.innerHTML = originalHTML;
          }, 1500);
      });
  };

  // Fill table with cafe data
  userData.userDto.kafeName.forEach(async (item, index) => {
    // First create the row without tariff name
    const row = document.createElement('tr');
    row.id = `tr${item._id}`;
    
    // Add initial content
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td class="tariff-cell-${item._id}">
            <div class="spinner-border spinner-border-sm text-secondary" role="status">
                <span class="visually-hidden">Yuklanmoqda...</span>
            </div>
        </td>
        <td>${item.status === 'inactive' ? 'Faol emas' : item.status === 'active' ? 'Faol' : 'Blocklangan'}</td>
        <td>${item.balance} som</td>
        <td>${userData.userDto.email.split('@')[0]}</td>
        <td>
            <span class="password-field">•••••••</span>
            <button class="btn btn-sm btn-outline-secondary view-password" data-id="${item._id}">
                <i class="bx bx-low-vision"></i>
            </button>
        </td>
        <td class="d-flex gap-2">
            ${item.status === 'active' ? `
                <button class="btn btn-sm btn-success open-app" data-id="${item._id}" data-name="${item.name}">
                    <i class="bi bi-box-arrow-up-right"></i> Ilovani ochish
                </button>
            ` : ''}
            <button class="btn btn-sm btn-danger delete-cafe" data-name="item.name" data-id="${item._id}">
                <i class="bi bi-trash"></i> O'chirish
            </button>
        </td>
    `;
    
    // Add row to table
    tBody.appendChild(row);
    
    // Add click event listener for open app button
    const openAppBtn = row.querySelector('.open-app');
    if (openAppBtn) {
        openAppBtn.addEventListener('click', () => {
            const modal = new bootstrap.Modal(document.getElementById('openAppModal'));
            const appLoginField = document.getElementById('appLoginField');
            const appPasswordField = document.getElementById('appPasswordField');
            const openAppLoader = document.getElementById('openAppLoader');
            const modalOpenAppBtn = document.getElementById('openAppBtn');

            // Set login credentials
            appLoginField.value = userData.userDto.email.split('@')[0];
            appPasswordField.value = userData.userDto.password;

            // Add click event listener for open app button in modal
            modalOpenAppBtn.onclick = async () => {
                try {
                    // Show loader
                    openAppLoader.style.display = 'block';
                    modalOpenAppBtn.disabled = true;

                    const response = await fetch(`${API_URL}/proxy/login`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: `${userData.userDto.firstName} ${userData.userDto.lastName}`,
                            login: userData.userDto.email.split('@')[0],
                            password: userData.userDto.password,
                            kafeId: item._id,
                            tarifId: 1
                        })
                    });

                    const data = await response.json();
                    if (data.redirect) {
                        window.location.href = data.redirect;
                    } else {
                        console.log('Javob:', data);
                    }
                } catch (error) {
                    console.error('Error opening app:', error);
                    alert('Ilovani ochishda xatolik yuz berdi');
                } finally {
                    // Hide loader
                    openAppLoader.style.display = 'none';
                    modalOpenAppBtn.disabled = false;
                }
            };

            modal.show();
        });
    }

    // Then fetch and update tariff name
    if (item.tariff) {
        try {
            const response = await fetch(`${API_URL}/api/tariffs/get-one/${item.tariff}`);
            if (!response.ok) {
                throw new Error('Tarif ma\'lumotlarini yuklashda xatolik');
            }
            
            const tariff = await response.json();
            const tariffCell = document.querySelector(`.tariff-cell-${item._id}`);
            tariffCell.innerHTML = `
                <a href="javascript:void(0)" 
                   class="text-primary text-decoration-none tariff-link" 
                   data-tariff-id="${item.tariff}">
                    ${tariff.tariff_name}
                </a>
            `;
            
            // Add click event listener to the tariff link
            tariffCell.querySelector('.tariff-link').addEventListener('click', () => {
                showTariffDetails(item.tariff);
            });
        } catch (error) {
            console.error('Error loading tariff:', error);
            const tariffCell = document.querySelector(`.tariff-cell-${item._id}`);
            tariffCell.innerHTML = `<span class="text-danger">Xatolik yuz berdi</span>`;
        }
    } else {
        const tariffCell = document.querySelector(`.tariff-cell-${item._id}`);
        tariffCell.innerHTML = '<span class="text-muted">Tarif tanlanmagan</span>';
    }
  });
          // <button class="btn btn-sm btn-primary edit-cafe" data-id="${item._id}">
          //   <i class="bi bi-pencil"></i> Edit
          // </button>


  // View password button handler
  document.querySelectorAll('.view-password').forEach(button => {
    button.addEventListener('click', () => openViewPasswordModal(button.dataset.id));
  });
	document.querySelectorAll('.delete-cafe').forEach(button => {
		button.addEventListener('click', () => openDeleteModal(button.dataset.id));
	});

  function openViewPasswordModal(cafeId) {
    const cafe = userData.userDto.kafeName.find(c => c._id === cafeId);
    if (cafe) {
      document.getElementById('view-cafe-login').value = userData.userDto.email.split('@')[0];
      document.getElementById('view-cafe-password').value = userData.userDto.password;
      viewPasswordModal.show();
    }
  }

  // Copy password
  if (copyPasswordBtn) {
    copyPasswordBtn.addEventListener('click', () => {
      const passwordField = document.getElementById('view-cafe-password');
			passwordField.select();
      navigator.clipboard.writeText(passwordField.value).then(() => {
        const originalHTML = copyPasswordBtn.innerHTML;
        copyPasswordBtn.innerHTML = '<i class="bx bx-check"></i>';
        setTimeout(() => {
          copyPasswordBtn.innerHTML = originalHTML;
        }, 1500);
      });
    });
  }

	
	function openDeleteModal(cafeId) {
		document.getElementById('delete-cafe-id').value = cafeId;
		deleteCafeModal.show();
	}

	async function handleDeleteCafe() {
		const id = document.getElementById('delete-cafe-id').value;
		const response = await fetch(`${API_URL}/api/crud/update-user/delete-kafeName/${userId}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id }),
		})

		if(response.status === 200){
			document.querySelector('#tr' + id).remove()
		}

		const data = await response.json()
		console.log(data);
		
		deleteCafeModal.hide();
	}

  // Add modal HTML to the page
  document.body.insertAdjacentHTML('beforeend', `
      <div class="modal fade" id="tariffDetailsModal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title">Tarif ma'lumotlari</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div class="modal-body">
                      <div id="tariffModalContent"></div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Yopish</button>
                  </div>
              </div>
          </div>
      </div>
  `);

  // Function to show tariff details in modal
  async function showTariffDetails(tariffId) {
    try {
        const response = await fetch(`${API_URL}/api/tariffs/get-one/${tariffId}`);
        if (!response.ok) {
            throw new Error('Tarif ma\'lumotlarini yuklashda xatolik');
        }
        
        const tariff = await response.json();
        
        const modalContent = document.getElementById('tariffModalContent');
        modalContent.innerHTML = `
            <h4 class="mb-4">${tariff.tariff_name || 'Noma\'lum tarif'}</h4>
            <div class="pricing-section mb-4">
                ${tariff.tariff_durations?.daily ? `
                    <div class="pricing-option mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="mb-0">${tariff.tariff_durations.daily.duration || 0} kun</h5>
                            </div>
                            <div>
                                <span class="h5 mb-0">${(tariff.tariff_durations.daily.price || 0).toLocaleString()} UZS</span>
                            </div>
                        </div>
                    </div>
                ` : ''}
                ${tariff.tariff_durations?.monthly ? `
                    <div class="pricing-option mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="mb-0">${tariff.tariff_durations.monthly.duration || 0} oy</h5>
                            </div>
                            <div>
                                <span class="h5 mb-0">${(tariff.tariff_durations.monthly.price || 0).toLocaleString()} UZS</span>
                            </div>
                        </div>
                    </div>
                ` : ''}
                ${tariff.tariff_durations?.yearly ? `
                    <div class="pricing-option mb-3 p-3 border rounded">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 class="mb-0">${tariff.tariff_durations.yearly.duration || 0} yil</h5>
                            </div>
                            <div>
                                <span class="h5 mb-0">${(tariff.tariff_durations.yearly.price || 0).toLocaleString()} UZS</span>
                            </div>
                        </div>
                    </div>
                ` : ''}
            </div>
            ${tariff.tariff_is_free_trial ? `
                <div class="alert alert-success">
                    <i class="bx bx-info-circle me-2"></i>
                    Bu tarif 14 kunlik bepul sinov muddatini o'z ichiga oladi
                </div>
            ` : ''}
            ${!tariff.tariff_durations?.daily && !tariff.tariff_durations?.monthly && !tariff.tariff_durations?.yearly ? `
                <div class="alert alert-warning">
                    <i class="bx bx-info-circle me-2"></i>
                    Bu tarif uchun narxlar belgilanmagan
                </div>
            ` : ''}
        `;

        const modal = new bootstrap.Modal(document.getElementById('tariffDetailsModal'));
        modal.show();
    } catch (error) {
        console.error('Error loading tariff details:', error);
        const modalContent = document.getElementById('tariffModalContent');
        modalContent.innerHTML = `
            <div class="alert alert-danger">
                <i class="bx bx-error-circle me-2"></i>
                Tarif ma'lumotlarini yuklashda xatolik yuz berdi
            </div>
        `;
        const modal = new bootstrap.Modal(document.getElementById('tariffDetailsModal'));
        modal.show();
    }
  }
});