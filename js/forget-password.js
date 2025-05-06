import { API_URL } from './api-url.js'

const form = document.getElementById('forgotPasswordForm');
const submitButton = form.querySelector('.submit-btn');

form.addEventListener('submit', async (e) => {
	e.preventDefault()

	const email = document.getElementById('email').value

	// Show loading state
	submitButton.classList.add('loading')
	submitButton.disabled = true

	try {
		const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email
			})
		})

		const data = await res.json()

		if (res.ok) {
			alert(data.message || 'Email manzilingizga parolni tiklash uchun havola yuborildi')
			form.reset()
			// Redirect to login page after 2 seconds
			setTimeout(() => {
				window.location.href = 'login.html';
			}, 2000);
		} else {
			alert(data.error || 'Xatolik yuz berdi')
		}
	} catch (err) {
		alert('Server bilan bog\'lanishda xatolik yuz berdi')
	} finally {
		// Hide loading state
		submitButton.classList.remove('loading')
		submitButton.disabled = false
	}
})
