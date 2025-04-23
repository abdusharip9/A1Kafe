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

  // Fill table with cafe data
  userData.userDto.kafeName.forEach((item, index) => {
    tBody.innerHTML += `
      <tr id="tr${item._id}">
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td></td>
        <td>${item.status === 'inactive' ? 'Faol emas' : item.status === 'active' ? 'Faol' : 'Blocklangan'}</td>
        <td>${item.balance} som</td>
        <td>${userData.userDto.email.split('@')[0]}</td>
        <td>
          <span class="password-field">•••••••</span>
          <button class="btn btn-sm btn-outline-secondary view-password" data-id="${item._id}">
            <i class="bx bx-low-vision"></i>
          </button>
        </td>
        <td>

          <button class="btn btn-sm btn-danger delete-cafe" data-name="item.name" data-id="${item._id}">
            <i class="bi bi-trash"></i> O'chirish
          </button>
        </td>
      </tr>
    `;
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
});