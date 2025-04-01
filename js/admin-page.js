import { logout } from './logout.js'
import { verify } from './verify-token.js'

await verify()
const logoutBtn = document.querySelector('#logoutBtn')
logoutBtn.addEventListener('click', logout)
