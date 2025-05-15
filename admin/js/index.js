import { API_URL } from '../../js/api-url.js'
import { getToken, verify } from './verify-token.js'

document.addEventListener('DOMContentLoaded', async () => {
    const userData = await verify()
    console.log(userData)
})

// User ma'lumotlarini sidebar ga yangilash
function updateUserInfo(user) {
		const userInitials = document.getElementById('userInitials')
		const currentUserName = document.getElementById('currentUserName')
		const currentUserRole = document.getElementById('currentUserRole')

		if (user.firstName && user.lastName) {
				// Initials yaratish
				const initials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase()
				userInitials.textContent = initials

				// To'liq ism
				currentUserName.textContent = `${user.firstName} ${user.lastName}`
		} else if (user.email) {
				// Agar ism yo'q bo'lsa, email dan init yasash
				const initials = user.email.charAt(0).toUpperCase()
				userInitials.textContent = initials
				currentUserName.textContent = user.email
		}

		// Rol ko'rsatish
		if (user.role) {
				let roleText = ''
				switch (user.role.toLowerCase()) {
						case 'admin':
								roleText = 'Tizim administratori'
								break
						case 'manager':
								roleText = 'Menejer'
								break
						case 'user':
								roleText = 'Foydalanuvchi'
								break
						default:
								roleText = user.role
				}
				currentUserRole.textContent = roleText
		}
}

// Logout funksiyasi
function logout() {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('id')
		localStorage.removeItem('user')
		localStorage.removeItem('rememberMe')
		localStorage.removeItem('rememberedUsername')
		window.location.href = '/admin/login.html'
}

// Sahifa yuklanganda token tekshirish
document.addEventListener('DOMContentLoaded', async () => {
		try {
				// verify-token.js dan foydalanib tekshirish
				const userData = await verify()
				
				// User ma'lumotlarini sidebar ga jo'ylash
				updateUserInfo(userData)
				
				// Token to'g'ri bo'lsa, dashboard ma'lumotlarini yuklash
				fetchDashboardData()
		} catch (error) {
				console.error('Verification failed:', error)
				// verify() funksiyasi avtomatik ravishda login sahifaga yo'naltiradi
		}
})

// Logout tugmasi uchun hodisa
document.getElementById('logoutBtn').addEventListener('click', () => {
		logout()
})

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle')
const html = document.documentElement
const icon = themeToggle.querySelector('i')

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light'
html.setAttribute('data-bs-theme', savedTheme)
updateThemeIcon(savedTheme)

themeToggle.addEventListener('click', () => {
		const currentTheme = html.getAttribute('data-bs-theme')
		const newTheme = currentTheme === 'light' ? 'dark' : 'light'

		html.setAttribute('data-bs-theme', newTheme)
		localStorage.setItem('theme', newTheme)
		updateThemeIcon(newTheme)
})

function updateThemeIcon(theme) {
		icon.className = theme === 'light' ? 'bi bi-moon-stars' : 'bi bi-sun'
}

// Mobile sidebar toggle
const sidebarToggle = document.getElementById('sidebarToggle')
const sidebar = document.querySelector('.sidebar')

sidebarToggle.addEventListener('click', () => {
		sidebar.classList.toggle('show')
})

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
		if (window.innerWidth <= 768 &&
				!sidebar.contains(e.target) &&
				!sidebarToggle.contains(e.target) &&
				sidebar.classList.contains('show')) {
				sidebar.classList.remove('show')
		}
})

// Dashboard data
async function fetchDashboardData() {
		try {
				const response = await fetch(`${API_URL}/api/crud/get-data-for-dashboard`, {
						headers: {
								'Authorization': `Bearer ${getToken()}`,
								'Content-Type': 'application/json'
						}
				})
				const data = await response.json()

				// Update dashboard statistics with real data
				document.getElementById('totalCafes').textContent = data.allKafes
				document.getElementById('totalUsers').textContent = data.allUsers
				document.getElementById('activeTariffs').textContent = data.allTariffs
				document.getElementById('totalFeatures').textContent = data.allFeatures
		} catch (error) {
				console.error('Error fetching dashboard data:', error)
				// Show error toast
				const errorToast = document.getElementById('errorToast')
				const errorToastMessage = document.getElementById('errorToastMessage')
				errorToastMessage.textContent = 'Ma\'lumotlarni yuklashda xatolik yuz berdi!'
				const bsErrorToast = new bootstrap.Toast(errorToast)
				bsErrorToast.show()

				// Show error state in cards
				document.getElementById('totalCafes').textContent = '-'
				document.getElementById('totalUsers').textContent = '-'
				document.getElementById('activeTariffs').textContent = '-'
				document.getElementById('totalFeatures').textContent = '-'
		}
}