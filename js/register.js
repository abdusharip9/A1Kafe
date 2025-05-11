import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'

function validatePassword() {
	var password = document.getElementById('password').value
	var confirmPassword = document.getElementById('confirmPassword').value
	var errorMessage = document.getElementById('error-message')
	var formButton = document.querySelector('#loginForm button')

	if (password !== confirmPassword) {
		errorMessage.textContent = 'Parollar mos kelmadi!'
		formButton.setAttribute('disabled', true)
		return false
	} else if (password.length < 4) {
		errorMessage.textContent =
			'Parol kamida 4 ta belgidan iborat bo‘lishi kerak!'
		return false
	} else {
		errorMessage.textContent = ''
		formButton.removeAttribute('disabled')
		return true
	}
}

document.querySelectorAll('.pass').forEach(item => {
	item.addEventListener('input', validatePassword)
})

document.getElementById('loginForm').onsubmit = async function (event) {
	event.preventDefault()

	const containerBtn = document.querySelector('.containerBtn')
	const submitBtn = document.querySelector('#submitBtn')
	containerBtn.classList.remove('d-none')
	submitBtn.setAttribute('disabled', 'disabled')

	const firstName = document.getElementById('firstName').value
	const lastName = document.getElementById('lastName').value
	const phone = document.getElementById('phone').value
	const email = document.getElementById('email').value
	const password = document.getElementById('password').value
	const kafeName = document.getElementById('kafeName').value

	const response = await fetch(`${API_URL}/api/auth/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ firstName, lastName, phone, email, password, kafeName }),
	})

	const data = await response.json()
	console.log(data)

	if (response.ok) {
		localStorage.setItem('email', email)
		window.location.href = '/view/activate/otp.html'
	} else if (response.status === 400) {
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
