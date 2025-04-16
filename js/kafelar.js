// import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

const userData = await verify()
const token = localStorage.getItem('accessToken')
const adminId = userData.userDto.id

if (!token) {
	window.location.href = '/login.html'
}

const logoutBtn = document.querySelector('#logoutBtn')
logoutBtn.addEventListener('click', logout)

const cards = document.querySelector('#cards')
const modalContainer = document.querySelector('.maodals')
console.log(modalContainer);

cards.innerHTML = ''

console.log(userData);


if(userData.userDto.kafeName){
	await userData.userDto.kafeName.forEach((item, index)=>{
		cards.innerHTML += `
			<div class="card px-0 kafeCard mt-3">
				<div class="card-header fw-bolder">
					Kafelar
				</div>

				<div class="card-body">

					<div class="d-flex justify-content-between mb-3 card-top">
						<div class="kafe-data">
							<h5 class="card-title fs-3 fw-bold text-primary">${item.name}</h5>
							<span class="card-text fs-6 fw-medium text-bg-warning">${userData.userDto.phone}</span>
						</div>

						<div class="account">
							<div class="border-primary d-inline-block bg-light text-primary kafeRound">${userData.userDto.firstName[0]+userData.userDto.lastName[0] }</div>
							<div class="d-flex flex-column">
								<div class="text-secondary fs-6 fw-bold">${userData.userDto.firstName} ${userData.userDto.lastName}</div>
								<div class="text-secondary fs-6 fw-bold">${userData.userDto.email}</div>
							</div>
						</div>
					</div>

					<div class="list-item-section">
						<ul class="list-group list-group-horizontal">
							<li class="list-group-item list-group-item-action bg-light text-dark fw-bold">Login</li>
							<li class="list-group-item bg-secondary-subtle text-dark fw-bold">${userData.userDto.email.split("@")[0]}</li>
						</ul>
						<ul class="list-group list-group-horizontal mt-3">
							<li class="list-group-item list-group-item-action bg-light text-dark fw-bold">Parol</li>
							<li class="list-group-item bg-secondary-subtle text-dark fw-bold">1111</li>
						</ul>
						<ul class="list-group list-group-horizontal mt-3">
							<li class="list-group-item list-group-item-action bg-light text-dark fw-bold">Status</li>
							<li class="list-group-item bg-success text-light fw-bold">${item.status === 'inactive' ? 'No&nbsp;faol' : (item.status ?? 'active')}
							</li>
						</ul>
						<ul class="list-group list-group-horizontal mt-3">
							<li class="list-group-item list-group-item-action bg-light text-dark fw-bold">Balance</li>
							<li class="list-group-item bg-success text-light fw-bold">${item.balance}&nbsp;som</li>
						</ul>
						<ul class="list-group list-group-horizontal mt-3">
							<li class="list-group-item list-group-item-action bg-light text-dark fw-bold">Tarif</li>
							<li class="list-group-item bg-primary text-light fw-bold">${item.tariff || 'Tanlanmagan'}
							</li>
						</ul>
					</div>

					<div class="buttons d-flex flex-row-reverse gap-2 mt-3">
						<button class="btn btn-primary">Ochish</button>
						<button class="btn btn-warning">Tahrirlash</button>
						<button class="btn btn-danger">O'chirish</button>
					</div>
				</div>
			</div>
		`
		const modalElement = document.createElement('div')
		modalElement.className = 'modal fade'
		modalElement.id = `kafeInfo${index}`
		modalElement.innerHTML = `
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h1 class="modal-title fs-5">${item} haqida</h1>
						<button type="button" class="btn-close" data-bs-dismiss="modal"></button>
					</div>
					<div class="modal-body">
						<ul class="list-group list-group-flush">
							<li class="list-group-item">Email: ${userData?.userDto?.email || ''}</li>
							<li class="list-group-item">Ism: ${userData?.userDto?.firstName || ''}</li>
							<li class="list-group-item">Familya: ${userData?.userDto?.lastName || ''}</li>
							<li class="list-group-item">Kafe nomi: ${item || ''}</li>
							<li class="list-group-item">Telefon raqam: ${userData?.userDto?.phone || ''}</li>
						</ul>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary">Yopish</button>
					</div>
				</div>
			</div>
		`
		modalContainer.appendChild(modalElement)
	})
	const appUrl = 'http://172.20.169.105:8080/A1Kafe_war/main.do'
	const containerBtn = document.querySelector('.containerBtn')
	
	async function getLogin(){
		containerBtn.classList.remove('d-none')
	
		const {email, phone, lastName, firstName } = userData.userDto
	
		const response = await fetch(appUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, phone, lastName, firstName }),
		})
	
		console.log(response);
		
	
		containerBtn.classList.add('d-none')
		submitBtn.removeAttribute('disabled')
	}
}


async function getKafes(adminId){
	const response = await fetch(`${API_URL}/api/crud/kafes/${adminId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()
	if (!response.ok) throw new Error(data.message || 'Noma’lum xatolik')
	
	return data
}

async function getKafeUsers(kafeId){
	const response = await fetch(`${API_URL}/api/crud/kafe/${adminId}/get-kafe-data/${kafeId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	})
	const data = await response.json()
	if (!response.ok) throw new Error(data.message || 'Noma’lum xatolik')
	
	return data
	
}

let btnArr = document.querySelectorAll(`.kafe`)
const kafesArr = await getKafes(adminId)
kafesArr.forEach((item, index)=>{

	btnArr[index].addEventListener("click", async () => {
		let {data} = await getKafeUsers(item._id);
		console.log('sss',data);
		console.log(data);
		
		let emailSplit = data.email.split("@")[0];

		const response = await fetch(`${API_URL}/proxy/login`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				name: `${data.firstName} ${data.lastName}`,
				login: emailSplit,
				password: '1111',
				kafeId: data.kafe_id,
				tarifId: data.tarif_id,
			}),
		})
		.then(res => res.json())
		.then(data => {
			if (data.redirect) {
				window.location.href = data.redirect; // ✅ Brauzerni Java backend yuborgan manzilga yo'naltiramiz
			} else {
				console.log('Javob:', data);
			}
		})
		.catch(err => console.error(err));
			const data1 = await response.json()
			console.log(data1);
		});
});