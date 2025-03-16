import { logout } from './logout.js'
import { verify } from './verify-token.js'

const userData = await verify()

const email = document.querySelector('#email')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const phone = document.querySelector('#phone')
const adress = document.querySelector('#adress')
const kafeName = document.querySelector('#kafeName')
const logoutBtn = document.querySelector('#logoutBtn')

logoutBtn.addEventListener('click', logout)

const id = localStorage.getItem('id')

const userDataArr = [
	userData.userDto.email || '',
	userData.userDto.firstName || '',
	userData.userDto.lastName || '',
	userData.userDto.phone || '',
	userData.userDto.adress || '',
	userData.userDto.kafeName || '',
]
const inputValueArr = [email, firstName, lastName, phone, adress, kafeName]

userDataArr.forEach((item, index) => {
	if (item !== '' || item !== null || item !== undefined || !item) {
		inputValueArr[index].value = item
	} else {
		inputValueArr[index].value = ''
	}
})

document
	.getElementById('update-user-form')
	.addEventListener('submit', async function (e) {
		e.preventDefault() // Formning standart yuborilishini oldini olish

		const formData = new FormData(this)
		const jsonData = Object.fromEntries(formData.entries()) // FormData ni JSON ga o‘girish

		const token = localStorage.getItem('accessToken') // Tokenni localStorage dan olish

		const containerBtn = document.querySelector('.containerBtn')
		const submitBtn = document.querySelector('#submitBtn')
		containerBtn.classList.remove('d-none')
		submitBtn.setAttribute('disabled', '')

		const response = await fetch(
			`https://backend-app-5rtx.onrender.com/api/auth/update-user/${id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`, // Tokenni header orqali yuboramiz
				},
				body: JSON.stringify(jsonData),
			}
		)

		const result = await response.json()
		console.log(result) // Javobni ko‘rish

		if (response.ok) {
			if (result.message) {
				alert(result.message)
			}
		} else {
			result.errors.forEach(error => {
				alert('Xatolik: ' + error.msg)
			})
			if (result.message) {
				alert('Xatolik: ' + result.message)
			}
		}
		containerBtn.classList.add('d-none')
		submitBtn.removeAttribute('disabled')
	})
