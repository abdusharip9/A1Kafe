import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'

document.getElementById('loginForm').onsubmit = async function (event) {
	event.preventDefault()
	const containerBtn = document.querySelector('.containerBtn')
	const submitBtn = document.querySelector('#submitBtn')
	containerBtn.classList.remove('d-none')
	submitBtn.setAttribute('disabled', '')

	const email = document.getElementById('email').value
	const password = document.getElementById('password').value

	const response = await fetch(`${API_URL}/api/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password }),
	})

	const data = await response.json()

	if (response.ok) {
		localStorage.setItem('accessToken', data.data.accessToken)
		localStorage.setItem('id', data.data.user.id)
		window.location.href = '/kafelar.html'
	} else {
		data.errors.forEach(error => {
			showAlert('Xatolik: ' + error.msg, 'danger', 3000)
		})
		if (data.message) {
			showAlert('Xatolik: ' + data.message, 'danger', 3000)
		}
	}
	containerBtn.classList.add('d-none')
	submitBtn.removeAttribute('disabled')
}
