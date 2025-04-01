import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

const userData = await verify()

const token = localStorage.getItem('accessToken')

if (!token) {
	window.location.href = '/login.html' // Agar token bo‘lmasa, login sahifaga qaytarish
}

const email = document.querySelector('#email')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const logoutBtn = document.querySelector('#logoutBtn')

logoutBtn.addEventListener('click', logout)

const id = localStorage.getItem('id')

const userDataArr = [
	userData.userDto.email || '',
	userData.userDto.firstName || '',
	userData.userDto.lastName || '',
]
const inputValueArr = [email, firstName, lastName]

userDataArr.forEach((item, index) => {
	if (item !== '' || item !== null || item !== undefined || !item) {
		inputValueArr[index].value = item
	} else {
		inputValueArr[index].value = ''
	}
})

async function deleteUserData(id, userData, API_URL, urlType) {
	try {
		const response = await fetch(
			`${API_URL}/api/auth/update-user/delete-${urlType}/${id}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},

				body: JSON.stringify({ [urlType]: userData }),
			}
		)

		const data = await response.json()
		console.log('Natija:', data)
		console.log('kkkk', data.newData.message)
		if (urlType === 'phone') {
			itemIteration('phones', data.newData.phones, id, API_URL, 'phone')
		} else {
			itemIteration(
				'kafeNames',
				data.newData.updatedUser.name,
				id,
				API_URL,
				'kafeName'
			)
		}

		showAlert(data.newData.message, 'success', 3000)
	} catch (error) {
		showAlert('Xatolik: ' + error.msg, 'danger', 3000)
	}
}

export async function itemIteration(listId, dataName, id, API_URL, urlType) {
	console.log('l=>', listId, 'd=>', dataName)
	if (!dataName) return listId
	const listName = document.getElementById(listId)
	listName.innerHTML = ''
	dataName.forEach((item, index) => {
		listName.innerHTML += `
			<li class="list-group-item d-flex justify-content-between align-items-center">
				<div class="d-inline-block">
					<span class="fw-bold">${index + 1}. </span>
					<span class="">${item}</span>
				</div>
				<div class="d-inline-block">
					<button type="button" class="btn btn-danger ${urlType}" data-name="${item}" title="Delete">
							<i class="bx bx-trash"></i>
					</button>
				</div>
			</li>
		`
	})

	const deleteBns = document.querySelectorAll(`.${urlType}`)
	deleteBns.forEach(btn => {
		btn.addEventListener('click', async function () {
			const title = this.getAttribute('data-name')

			await deleteUserData(id, title, API_URL, urlType)
		})
	})
}

await itemIteration('phones', userData.userDto.phone, id, API_URL, 'phone')
await itemIteration(
	'kafeNames',
	userData.userDto.kafeName,
	id,
	API_URL,
	'kafeName'
)
