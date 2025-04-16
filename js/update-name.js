import { showAlert } from '../components/alert.js'
import { Loading } from '../components/loading.js'
import { API_URL } from './api-url.js'


const id = localStorage.getItem('id')

// firstName, lastName
function updateData(buttonId, inputId, postName) {
	const button = document.getElementById(buttonId)
	const input = document.getElementById(inputId)
	const token = localStorage.getItem('accessToken')
	
	let loading = new Loading(buttonId, 'Yuborilmoqda', 'Yangilash')

	async function handleClick() {
		loading.bigLoading()

		const response = await fetch(`${API_URL}/api/crud/update-user/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ [postName]: input.value }),
		})
		const result = await response.json()
		console.log(result)
		loading.removeLoading()
		showAlert(result.message, 'success', 3000)
	}

	button.addEventListener('click', handleClick)
}

updateData('updateFirstName', 'firstName', 'firstName')
updateData('updateLastName', 'lastName', 'lastName')
updateData('updatePhone', 'phone', 'phone')
