window.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#messageForm'),
		successModal = document.querySelector('#alertStatus')

	const openModal = (text, className) => {
		successModal.innerHTML = `
		<div class="alert alert-${className} alert-dismissible fade show" role="alert">
		${text}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		</div>
		`
	}

	form.addEventListener('submit', event => {
		successModal.classList.add('show')
		successModal.classList.remove('hide')

		telegramTokenBot = '7654555696:AAGeUlsDhJbCQSj356CQsXZ5tTa8YFqfyZM'
		chatId = '1310068731'
		event.preventDefault()

		const formData = new FormData(form)

		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})

		fetch(`https://api.telegram.org/bo1t${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `Name: ${object.name}. Phone: ${object.phone}`,
			}),
		})
			.then(() => {
				openModal('Muvaffaqiyatli yuborildi', 'success')
				form.reset()
			})
			.catch(() => {
				openModal('Kutilmagan xatolik yuz berdi', 'danger')
			})
			.finally(() => {
				setTimeout(() => {
					successModal.classList.remove('show')
					successModal.classList.add('hide')
				}, 4000)
			})
	})
})
