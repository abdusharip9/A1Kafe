import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

// Auth tekshirish
const userData = await verify()
const token = localStorage.getItem('accessToken')
if (!token) {
	window.location.href = '/login.html'
}

const id = userData.userDto.id

// Logout
document.querySelector('#logoutBtn').addEventListener('click', logout)

// KAFE RO‘YXATINI CHIZISH
async function renderKafeList(kafeList, id) {
	if (!kafeList) return

	kafeList.forEach((item, index) => {
		const listItem = document.createElement('li')
		// listItem.className = 'list-group-item d-flex justify-content-between align-items-center'
		// listItem.innerHTML = `
		// 	<div class="d-inline-block">
		// 		<span class="fw-bold">${index + 1}. </span>
		// 		<span>${item.name}</span>
		// 	</div>
		// 	<div class="d-inline-block">
		// 		<button type="button" class='btn btn-danger delete-kafe' data-name="${item.name}" title="Delete">
		// 			<i class="bx bx-trash"></i>
		// 		</button>
		// 	</div>
		// `
		// listElement.appendChild(listItem)
	})

	document.querySelectorAll('.delete-kafe').forEach(btn => {
		btn.addEventListener('click', async function () {
			const name = this.getAttribute('data-name')
			await deleteKafeName(id, name)
		})
	})
}

// KAFE O‘CHIRISH
async function deleteKafeName(id, kafeName) {
	try {
		const response = await fetch(`${API_URL}/api/crud/update-user/delete-kafeName/${id}`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ kafeName }),
		})

		const data = await response.json()
		if (!response.ok) throw new Error(data.message || 'Noma’lum xatolik')

		const updatedKafes = data.newData?.kafes || []
		await renderKafeList(updatedKafes, id)
		showAlert(data.newData?.message || 'Kafe o‘chirildi', 'success', 3000)
	} catch (error) {
		showAlert('Xatolik: ' + error.message, 'danger', 3000)
	}
}

// KAFE QO‘SHISH
document.getElementById('addKafe').addEventListener('submit', handleKafeSubmit)

async function handleKafeSubmit(e) {
	e.preventDefault()
	const formElement = e.target
	const formData = new FormData(formElement)
	formData.append('id', id)

		const response = await fetch(`${API_URL}/api/crud/update-user/add-kafeName/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(Object.fromEntries(formData.entries())),
		})

		const result = await response.json()
		if (!response.ok){
			showAlert(result.message, 'danger', 3000)
		}

		if (result.newData?.message) {
			showAlert(result.newData.message, 'success', 3000)
			const newData = result.newData.kafes || []
			await renderKafeList(newData, id)
		}
		formElement.reset()
}

// Boshlang'ich render
await renderKafeList(userData.userDto.kafeName, id)