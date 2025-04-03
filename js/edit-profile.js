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
			`${API_URL}/api/auth/update-user/delete-${urlType}/${id}`,
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
			data.newData?.phones || data.newData?.updatedUser?.name || []
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
			${
				urlType === 'phone'
					? `
						<button type="button" class='btn btn-danger ${urlType}' data-name="${item}" title="Delete">
							<i class="bx bx-trash"></i>
						</button>
						`
					: ''
			}
				${
					urlType === 'kafeName'
						? `
							<button type="button" class='btn btn-danger ${urlType}' data-name="${item}" title="Delete">
								<i class="bx bx-trash"></i>
							</button>
							<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kafe${index}">
								<i class="bx bx-play"></i> Ochish
							</button>`
						: ''
				}
			</div>
		`
		listElement.appendChild(listItem)

		if (urlType === 'kafeName') {
			const modalContainer = document.querySelector('.maodals')
			const modalElement = document.createElement('div')
			modalElement.className = 'modal fade'
			modalElement.id = `kafe${index}`
			modalElement.innerHTML = `
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5">${item} haqida</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
						</div>
						<div class="modal-body">
							<ul class="list-group list-group-flush">
								<li class="list-group-item">Email: ${userData.userDto.email}</li>
								<li class="list-group-item">Ism: ${userData.userDto.firstName}</li>
								<li class="list-group-item">Familya: ${userData.userDto.lastName}</li>
								<li class="list-group-item">Kafe nomi: ${item}</li>
								<li class="list-group-item">Telefon raqam: ${userData.userDto.phone[index]}</li>
							</ul>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Bekor qilish</button>
							<a href="http://172.20.169.105:8080/A1Kafe_war/main.do?action=add_web_use&login=${userData.userDto.email}&password=1212&telNumber=${userData.userDto.phone[index]}&lastName=${userData.userDto.lastName}&tarifId=3&firstName=${userData.userDto.firstName}" class="btn btn-primary">Ochish</a>
						</div>
					</div>
				</div>
			`
			modalContainer.appendChild(modalElement)
		}
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
