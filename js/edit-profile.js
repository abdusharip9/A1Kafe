import { logout } from './logout.js'
import { verify } from './verify-token.js'

// Auth tekshirish
const userData = await verify()
const token = localStorage.getItem('accessToken')
if (!token) {
	window.location.href = '/login.html'
}

const id = userData.userDto.id

// Logout
document.querySelector('#logoutBtn').addEventListener('click', logout)

// User static ma’lumotlar
const email = document.querySelector('#email')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const phone = document.querySelector('#phone')

const userDataArr = [
	userData.userDto?.email || '',
	userData.userDto?.firstName || '',
	userData.userDto?.lastName || '',
	userData.userDto?.phone || '',
]
const inputValueArr = [email, firstName, lastName, phone]

userDataArr.forEach((item, index) => {
	inputValueArr[index].value = item || ''
})
