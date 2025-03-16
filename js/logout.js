export async function logout() {
	const response = await fetch(
		'https://backend-app-5rtx.onrender.com/api/auth/logout',
		{
			method: 'POST',
		}
	).then(() => {
		localStorage.removeItem('accessToken')
		window.location.href = '/login.html'
	})

	return await response.json()
}
