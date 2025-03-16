export async function verify() {
	const token = localStorage.getItem('accessToken')

	if (!token) {
		window.location.href = '/login.html' // Agar token bo‘lmasa, login sahifaga qaytarish
	}

	const response = await fetch(
		'https://backend-app-5rtx.onrender.com/api/auth/getUser',
		{
			method: 'GET',
			headers: { Authorization: `Bearer ${token}` },
		}
	)

	if (!response.ok) {
		localStorage.removeItem('accessToken')
		window.location.href = '/login.html' // Token noto‘g‘ri bo‘lsa, login sahifaga qaytarish
	}

	const data = await response.json()

	console.log(data)

	localStorage.setItem('id', data._id)

	return data
}
