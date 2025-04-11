// import { showAlert } from '../components/alert.js'
// import { API_URL } from './api-url.js'
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

const kafeList = document.querySelector('#kafeList')
const modalContainer = document.querySelector('.maodals')
console.log(modalContainer);

kafeList.innerHTML = ''

if(userData.userDto.kafeName){
	await userData.userDto.kafeName.forEach((item, index)=>{
		kafeList.innerHTML += `
			<li class="list-group-item d-flex justify-content-between align-items-center">
				${item}
				<div>
					<button type="button" class="btn btn-primary d-inline-block" data-bs-toggle="modal" data-bs-target="#kafeInfo${index}">
						<i class="bx bx-info-circle"></i> Malumotlar
					</button>
					<button type="button" s overflow: hidden;" class="kafe" class="btn btn-primary">
						<i class="bx bx-send"></i> Login Parol olsih
						<div class="containerBtn d-none">
						<div class="bar"></div>
					</div>
					</button>
				</div>
			</li>

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
	
	console.log(item._id);
	// let button = document.createElement('button')
	// button.setAttribute('data-kafe-id', item._id)
	// button.setAttribute('class', 'nav_link sublink')
	// button.innerText = item.name
	btnArr[index].innerText = item.name
	btnArr[index].addEventListener("click", async () => {
		let {data} = await getKafeUsers(item._id);
		console.log('sss',data);

		let emailSplit = data.email.split("@")[0];

		// let a = document.createElement('a')
		// a.href = `http://172.20.169.105:8080/A1Kafe_war/main.do?action=add_web_use&name=${data.firstName}%20${data.lastName}&login=${emailSplit}&password=1111&kafeId=${data.kafe_id}&tarifId=${data.tarif_id}`
		// a.innerText = 'gettik'

		// console.log(a);

		// btnArr[index].append(a)

		const response = await fetch(`http://172.20.169.105:8080/A1Kafe_war/login.do?mode=add_web_user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ 
				name: `${data.firstName}%20${data.lastName}`,
				login: emailSplit,
				password: '1111',
				kafeId: data.kafe_id,
				tarifId: data.tarif_id,
			}),
		});
		const data1 = await response.json()
		console.log(data1);
		


		
	});
	// btnArr.append(button)
	// console.log('sss',item);



});



// <a href="http://172.20.169.105:8080/A1Kafe_war/main.do?action=add_web_use&login=${userData.userDto.email}&password=1212&telNumber=${userData.userDto.phone[index]}&lastName=${userData.userDto.lastName}&tarifId=3&firstName=${userData.userDto.firstName}" class="btn btn-primary">Ochish</a>
// http://localhost:8082/kafe/login.do?mode=login&login=admin&password=1111