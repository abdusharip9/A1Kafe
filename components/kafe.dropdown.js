import { API_URL } from '../js/api-url.js'

export class CafeDropDown{
	constructor(dropUl, button, clientId, token){
		this.dropUl = dropUl
		this.button = button
		this.clientId = clientId
		this.token = token
	}

	
	async getAllCafes(){
		let dropUl = document.querySelector(`.${this.dropUl}`)

		const response = await fetch(
			`${API_URL}/api/crud/kafes/${this.clientId}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${this.token}`,
					'Content-Type': 'application/json',
				},
			}
		)

		if (response.ok){
			const data = await response.json()
			// data.forEach((item, index)=>{
			// 	dropUl.innerHTML = `
			// 		<li><a class="dropdown-item active" href="#">Kafe 1</a></li>
			// 		<li><a class="dropdown-item" href="#">Another action</a></li>
			// 		<li><a class="dropdown-item" href="#">Something else here</a></li>
			// 		<li>
			// 			<hr class="dropdown-divider">
			// 		</li>
			// 		<li><a class="dropdown-item" href="#">Demo Kafe</a></li>
			// 	`
			// })
		} else {
			dropUl.innerHTML = `
				<li><a class="dropdown-item" href="#">Demo Kafe</a></li>
			`
		}
	}
}



