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

// for dinamic nav
window.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('#topNav .nav-link')
	const sections = document.querySelectorAll('.section')

	// Nav link bosilganda faollikni yangilash
	navLinks.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault() // Href linkga o'tmaslik uchun
			const targetId = link.getAttribute('href').substring(1) // Id olish
			const targetSection = document.getElementById(targetId)

			// Sectionga scroll qilish
			targetSection.scrollIntoView({ behavior: 'smooth' })

			// Har bir linkni faollikdan chiqarish
			navLinks.forEach(link => link.classList.remove('active'))

			// Tanlangan linkni faollashtirish
			link.classList.add('active')
		})
	})

	// Scroll holatida faollikni yangilash
	const changeActiveLink = () => {
		let currentSection = null
		sections.forEach(section => {
			const rect = section.getBoundingClientRect()
			if (
				rect.top <= window.innerHeight / 2 &&
				rect.bottom >= window.innerHeight / 2
			) {
				currentSection = section
			}
		})

		if (currentSection) {
			navLinks.forEach(link => {
				if (link.getAttribute('href').substring(1) === currentSection.id) {
					link.classList.add('active')
				} else {
					link.classList.remove('active')
				}
			})
		}
	}

	window.addEventListener('scroll', changeActiveLink)
	changeActiveLink() // Boshlang'ich holatni to'g'rilash
})
