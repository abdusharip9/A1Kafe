export async function logout() {
	const response = await fetch('http://localhost:3000/api/auth/logout', {
		method: 'POST',
	}).then(() => {
		localStorage.removeItem('accessToken')
		window.location.href = '/login.html'
	})

	return await response.json()
}
