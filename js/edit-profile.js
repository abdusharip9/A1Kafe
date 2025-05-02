import { logout } from './logout.js'
import { verify } from './verify-token.js'

// Auth tekshirish
const userData = await verify()
const token = localStorage.getItem('accessToken')
if (!token) {
	window.location.href = '/login.html'
}

const id = userData.userDto.id

// Logout
document.querySelector('#logoutBtn').addEventListener('click', logout)

// User static ma'lumotlar
const email = document.querySelector('#email')
const firstName = document.querySelector('#firstName')
const lastName = document.querySelector('#lastName')
const phone = document.querySelector('#phone')

// Telefon raqami uchun validatsiya
phone.addEventListener('input', function(e) {
    // Faqat raqamlarni qoldirish
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Maksimal uzunlikni 9 ta raqam bilan cheklash
    if (this.value.length > 9) {
        this.value = this.value.slice(0, 9);
    }
});

const userDataArr = [
	userData.userDto?.email || '',
	userData.userDto?.firstName || '',
	userData.userDto?.lastName || '',
	userData.userDto?.phone || '',
]
const inputValueArr = [email, firstName, lastName, phone]

userDataArr.forEach((item, index) => {
	inputValueArr[index].value = item || ''
})
