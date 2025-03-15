import { verify } from './verify-token.js' // `.js` qo‘shish kerak

const userData = await verify()

const email = document.querySelector('#email')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const phone = document.querySelector('#phone')
const adress = document.querySelector('#adress')

const id = localStorage.getItem('id')

email.value = userData.email
firstName.value = userData.firstName
lastName.value = userData.lastName
phone.value = userData.phone
adress.value = userData.adress

document
	.getElementById('update-user-form')
	.addEventListener('submit', async function (e) {
		e.preventDefault() // Formning standart yuborilishini oldini olish

		const formData = new FormData(this)
		const jsonData = Object.fromEntries(formData.entries()) // FormData ni JSON ga o‘girish

		const token = localStorage.getItem('accessToken') // Tokenni localStorage dan olish

		const response = await fetch(
			`http://localhost:3000/api/auth/update-user/${id}`,
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
	})
