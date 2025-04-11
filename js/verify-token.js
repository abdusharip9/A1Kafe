import { API_URL } from './api-url.js'

export async function verify() {
	const token = localStorage.getItem('accessToken')
	const id = localStorage.getItem('id')

	if (!token) {
		window.location.href = '/login.html' // Agar token bo‘lmasa, login sahifaga qaytarish
	}

	const response = await fetch(`${API_URL}/api/crud/getUser/${id}`, {
		method: 'GET',
		headers: { Authorization: `Bearer ${token}` },
	})

	const data = await response.json()
	console.log(data)

	if (!response.ok) {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('id')
		window.location.href = '/login.html' // Token noto‘g‘ri bo‘lsa, login sahifaga qaytarish
	}

	return data
}
