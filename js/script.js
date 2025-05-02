window.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#messageForm'),
		alertStatus = document.querySelector('#alertStatus'),
		alertMessage = document.querySelector('#alertMessage'),
		submitBtn = document.querySelector('#submitBtn')

	const openModal = (text, className) => {
		alertStatus.className = `alert alert-${className} alert-dismissible fade show`
		alertMessage.textContent = text
		alertStatus.classList.remove('d-none')
	}

	form.addEventListener('submit', event => {
		event.preventDefault()

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
					alertStatus.classList.add('d-none')
					submitBtn.disabled = false
					submitBtn.innerText = 'Yuborish'
					submitBtn.classList.remove('btn-success', 'btn-danger')
				}, 4000)
			})
	})
})

window.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('#topNav .nav-link')
	const sections = document.querySelectorAll('.section')

	
	navLinks.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault() 
			const targetId = link.getAttribute('href').substring(1) 
			const targetSection = document.getElementById(targetId)

			
			targetSection.scrollIntoView({ behavior: 'smooth' })

			
			navLinks.forEach(link => link.classList.remove('link-secondary'))

			
			link.classList.add('link-secondary')
		})
	})

	
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
					link.classList.add('link-secondary')
				} else {
					link.classList.remove('link-secondary')
				}
			})
		}
	}

	window.addEventListener('scroll', changeActiveLink)
	changeActiveLink() 
})

// Scroll spy functionality
document.addEventListener('DOMContentLoaded', function() {
	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('.nav-link');

	function updateActiveLink() {
		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (window.scrollY >= (sectionTop - sectionHeight/3)) {
				current = section.getAttribute('id');
			}
		});

		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('active');
			}
		});
	}

	window.addEventListener('scroll', updateActiveLink);
	updateActiveLink(); // Initial check
});
