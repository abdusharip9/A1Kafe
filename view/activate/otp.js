import { showAlert } from '../../components/alert.js'
import { API_URL } from '../../js/api-url.js'

const inputs = document.querySelectorAll('.otp-field > input')
const button = document.querySelector('.btn')

window.addEventListener('load', () => inputs[0].focus())
button.setAttribute('disabled', 'disabled')

inputs[0].addEventListener('paste', function (event) {
	event.preventDefault()

	const pastedValue = (event.clipboardData || window.clipboardData).getData(
		'text'
	)
	const otpLength = inputs.length

	for (let i = 0; i < otpLength; i++) {
		if (i < pastedValue.length) {
			inputs[i].value = pastedValue[i]
			inputs[i].removeAttribute('disabled')
			inputs[i].focus
		} else {
			inputs[i].value = ''
			inputs[i].focus
		}
	}
})

inputs.forEach((input, index1) => {
	input.addEventListener('keyup', e => {
		const currentInput = input
		const nextInput = input.nextElementSibling
		const prevInput = input.previousElementSibling

		if (currentInput.value.length > 1) {
			currentInput.value = ''
			return
		}

		if (
			nextInput &&
			nextInput.hasAttribute('disabled') &&
			currentInput.value !== ''
		) {
			nextInput.removeAttribute('disabled')
			nextInput.focus()
		}

		if (e.key === 'Backspace') {
			inputs.forEach((input, index2) => {
				if (index1 <= index2 && prevInput) {
					input.setAttribute('disabled', true)
					input.value = ''
					prevInput.focus()
				}
			})
		}

		button.classList.remove('active')
		button.setAttribute('disabled', 'disabled')

		const inputsNo = inputs.length
		if (!inputs[inputsNo - 1].disabled && inputs[inputsNo - 1].value !== '') {
			button.classList.add('active')
			button.removeAttribute('disabled')

			return
		}
	})
})

const email = localStorage.getItem('email')
document.querySelector('#email').innerText = email

document.getElementById('sendBtn').onclick = async function () {
	let code = []
	inputs.forEach((item, index) => {
		code[index] = `${item.value.toString()}`
	})
	code = Number(code.join(''))
	console.log(code)

	const response = await fetch(`${API_URL}/api/auth/verify-code`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: email, code: code }),
	})
	const data = await response.json()

	console.log(data)

	if (response.status == 200) {
		localStorage.setItem('accessToken', data.data.accessToken)
		localStorage.setItem('id', data.data.user.id)
		window.location.href = '../../admin-page.html'
	} else if (response.status == 400) {
		showAlert('Kod mos kelmadi', 'danger', 3000)
	}
}
