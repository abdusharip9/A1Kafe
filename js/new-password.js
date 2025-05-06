import { API_URL } from './api-url.js'

const form = document.getElementById('newPasswordForm')
const result = document.getElementById('result')
const passwordError = document.getElementById('passwordError')
const confirmError = document.getElementById('confirmError')
const submitButton = form.querySelector('button[type="submit"]')

// Tokenni URL dan olish
const urlParams = new URLSearchParams(window.location.search)
const token = urlParams.get('token')

if (!token) {
	result.textContent = 'Token topilmadi. Iltimos, qaytadan urinib ko\'ring.'
	result.classList.add('error')
	form.style.display = 'none'
}

form.addEventListener('submit', async (e) => {
	e.preventDefault()

	// Reset error messages
	passwordError.style.display = 'none'
	confirmError.style.display = 'none'
	result.textContent = ''
	result.className = ''

	const newPassword = document.getElementById('newPassword').value
	const confirmPassword = document.getElementById('confirmPassword').value

	// Validate password length
	if (newPassword.length < 4) {
		passwordError.style.display = 'block'
		return
	}

	// Validate password match
	if (newPassword !== confirmPassword) {
		confirmError.style.display = 'block'
		return
	}

	// Show loading state
	submitButton.classList.add('loading')
	submitButton.disabled = true

	try {
		const res = await fetch(`${API_URL}/api/auth/recovery-account`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password: newPassword, token })
		})

		const data = await res.json()

		if (res.ok) {
			result.textContent = data.message || 'Parol muvaffaqiyatli o\'zgartirildi!'
			result.classList.add('success')
			form.reset()
			form.style.display = 'none'
			// Redirect to login page after 2 seconds
			setTimeout(() => {
				window.location.href = 'login.html'
			}, 2000)
		} else {
			result.textContent = data.error || 'Xatolik yuz berdi'
			result.classList.add('error')
		}
	} catch (err) {
		result.textContent = 'Server bilan bog\'lanishda xatolik yuz berdi'
		result.classList.add('error')
	} finally {
		// Hide loading state
		submitButton.classList.remove('loading')
		submitButton.disabled = false
	}
})