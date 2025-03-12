document.addEventListener('DOMContentLoaded', async function () {
	const token = localStorage.getItem('accessToken')

	if (!token) {
		window.location.href = '/login.html' // Agar token bo‘lmasa, login sahifaga qaytarish
	}

	const response = await fetch('http://localhost:3000/api/auth/verify', {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	})

	if (!response.ok) {
		localStorage.removeItem('accessToken')
		window.location.href = '/login.html' // Token noto‘g‘ri bo‘lsa, login sahifaga qaytarish
	}

	const data = await response.json()

	document.querySelector('#email').innerText = data.email
})
