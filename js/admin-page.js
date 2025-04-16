import { CafeDropDown } from '../components/kafe.dropdown.js'
import { logout } from './logout.js'
import { verify } from './verify-token.js'

const userData = await verify()
const id = await userData.userDto.id
const token = localStorage.getItem('accessToken')

if (!token) {
	window.location.href = '/login.html'
}

const logoutBtn = document.querySelector('#logoutBtn')
logoutBtn.addEventListener('click', logout)

let cafeDropDown = new CafeDropDown('dropUl', 'dropdown-toggle', id, token)

let btn = document.querySelector('.dropdown-toggle')
btn.addEventListener('click', () => cafeDropDown.getAllCafes())