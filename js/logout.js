import { API_URL } from './api-url.js'

export async function logout() {
	const response = await fetch(`${API_URL}/api/auth/logout`, {
		method: 'POST',
	}).then(() => {
		localStorage.removeItem('accessToken')
		window.location.href = '/login.html'
	})

	return await response.json()
}
