import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'
import { itemIteration } from './edit-profile.js'

const id = localStorage.getItem('id')

document.getElementById('addKafe').addEventListener('submit', function (e) {
	phoneAndKafe(e, 'kafeName', this, 'kafeNames')
})
document.getElementById('addPhone').addEventListener('submit', function (e) {
	phoneAndKafe(e, 'phone', this, 'phones')
})

async function phoneAndKafe(e, urlPice, formElement, listId) {
	e.preventDefault()
	const formData = new FormData(formElement)
	formData.append('id', id)
	const token = localStorage.getItem('accessToken')
	const jsonData = Object.fromEntries(formData.entries())

	const response = await fetch(
		`${API_URL}/api/auth/update-user/add-${urlPice}/${id}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(jsonData),
		}
	)

	const result = await response.json()
	let newData = null
	if (response.ok) {
		if (result.newData.message) {
			showAlert(result.newData.message, 'success', 3000)
			if (result.newData.kafes) {
				newData = result.newData.kafes
			} else if (result.newData.phones || result.newData.phones == []) {
				newData = result.newData.phones
			}
			await itemIteration(listId, newData, id, API_URL, urlPice)
		}
	} else if (result.errors) {
		result.errors.forEach(error => {
			showAlert('Xatolik: ' + error.msg, 'danger', 3000)
		})
		if (result.message) {
			showAlert('Xatolik: ' + result.message, 'danger', 3000)
		} else showAlert(result.message, 'danger', 3000)
	} else showAlert('Xatolik: ' + result.message, 'danger', 3000)
	formElement.reset()
}
