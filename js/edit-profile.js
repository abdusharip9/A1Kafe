import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

const userData = await verify()
const token = localStorage.getItem('accessToken')

if (!token) {
	window.location.href = '/login.html'
}

const email = document.querySelector('#email')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const logoutBtn = document.querySelector('#logoutBtn')
logoutBtn.addEventListener('click', logout)

const id = localStorage.getItem('id')

const userDataArr = [
	userData.userDto?.email || '',
	userData.userDto?.firstName || '',
	userData.userDto?.lastName || '',
]
const inputValueArr = [email, firstName, lastName]

userDataArr.forEach((item, index) => {
	inputValueArr[index].value = item || ''
})

async function deleteUserData(id, itemData, urlType) {
	try {
		const response = await fetch(
			`${API_URL}/api/crud/update-user/delete-${urlType}/${id}`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ [urlType]: itemData }),
			}
		)

		const data = await response.json()
		if (!response.ok) throw new Error(data.message || 'Noma’lum xatolik')

		const updatedData =
			data.newData?.phones || data.newData?.kafes || []
		await itemIteration(
			urlType === 'phone' ? 'phones' : 'kafeNames',
			updatedData,
			id,
			urlType
		)
		showAlert(data.newData?.message || 'Ma’lumot o‘chirildi', 'success', 3000)
	} catch (error) {
		showAlert('Xatolik: ' + error.message, 'danger', 3000)
	}
}

export async function itemIteration(listId, dataList, id, urlType) {
	if (!dataList) return
	const listElement = document.getElementById(listId)
	listElement.innerHTML = ''

	console.log(dataList);

	dataList.forEach((item, index) => {
		const listItem = document.createElement('li')
		listItem.className =
			'list-group-item d-flex justify-content-between align-items-center'
		listItem.innerHTML = `
			<div class="d-inline-block">
				<span class="fw-bold">${index + 1}. </span>
				<span>${item}</span>
			</div>
			<div class="d-inline-block">
				<button type="button" class='btn btn-danger ${urlType}' data-name="${item}" title="Delete">
					<i class="bx bx-trash"></i>
				</button>
			</div>
		`
		listElement.appendChild(listItem)
	})

	document.querySelectorAll(`.${urlType}`).forEach(btn => {
		btn.addEventListener('click', async function () {
			const title = this.getAttribute('data-name')
			await deleteUserData(id, title, urlType)
		})
	})
}

await itemIteration('phones', userData.userDto.phone, id, 'phone')
await itemIteration('kafeNames', userData.userDto.kafeName, id, 'kafeName')
