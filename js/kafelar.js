// import { API_URL } from './api-url.js'
// import { logout } from './logout.js'
// import { verify } from './verify-token.js'

// const userData = await verify()
// const token = localStorage.getItem('accessToken')
// const adminId = userData.userDto.id

// if (!token) {
// 	window.location.href = '/login.html'
// }

// const logoutBtn = document.querySelector('#logoutBtn')
// logoutBtn.addEventListener('click', logout)

// let btnArr = document.querySelectorAll(`.kafe`)
// userData.forEach((item, index)=>{

// 	btnArr[index].addEventListener("click", async () => {
// 		let {data} = await getKafeUsers(item._id);
		
// 		let emailSplit = data.email.split("@")[0];

// 		const response = await fetch(`${API_URL}/proxy/login`, {
// 			method: 'POST',
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ 
// 				name: `${data.firstName} ${data.lastName}`,
// 				login: emailSplit,
// 				password: '1111',
// 				kafeId: data.kafe_id,
// 				tarifId: data.tarif_id,
// 			}),
// 		})
// 		.then(res => res.json())
// 		.then(data => {
// 			if (data.redirect) {
// 				window.location.href = data.redirect; // ✅ Brauzerni Java backend yuborgan manzilga yo'naltiramiz
// 			} else {
// 				console.log('Javob:', data);
// 			}
// 		})
// 		.catch(err => console.error(err));
// 			const data1 = await response.json()
// 			console.log(data1);
// 		});
// });