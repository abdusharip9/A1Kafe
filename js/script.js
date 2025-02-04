window.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#messageForm'),
		successModal = document.querySelector('#alertStatus'),
		submitBtn = document.querySelector('#submitBtn')

	const openModal = (text, className) => {
		successModal.innerHTML = `
		<div class="alert alert-${className} alert-dismissible fade show" role="alert">
		${text}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
		</div>
		`
	}

	form.addEventListener('submit', event => {
		event.preventDefault()

		// Submit tugmani disabled qilish va "Yuborilmoqda..." textini ko'rsatish
		submitBtn.disabled = true
		submitBtn.innerText = 'Yuborilmoqda...'

		const formData = new FormData(form)
		const object = {}
		formData.forEach((value, key) => {
			object[key] = value
		})

		const telegramTokenBot = '7654555696:AAGeUlsDhJbCQSj356CQsXZ5tTa8YFqfyZM'
		const chatId = '1310068731'

		fetch(`https://api.telegram.org/bot${telegramTokenBot}/sendMessage`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				chat_id: chatId,
				text: `Ismi: ${object.name}\nTelefon: ${object.phone}\nIzoh: ${object.comment}`,
			}),
		})
			.then(() => {
				openModal('Muvaffaqiyatli yuborildi', 'success')
				form.reset()
				submitBtn.innerText = 'Yuborildi ✔️'
				submitBtn.classList.add('btn-success')
			})
			.catch(() => {
				openModal('Kutilmagan xatolik yuz berdi', 'danger')
				submitBtn.innerText = 'Xatolik ❌'
				submitBtn.classList.add('btn-danger')
			})
			.finally(() => {
				setTimeout(() => {
					successModal.classList.remove('show')
					successModal.classList.add('hide')
					submitBtn.disabled = false
					submitBtn.innerText = 'Yuborish'
					submitBtn.classList.remove('btn-success', 'btn-danger')
				}, 4000)
			})
	})
})
