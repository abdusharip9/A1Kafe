class Alert {
	constructor(message, type = 'info', duration = 3000) {
		this.message = message
		this.type = type
		this.duration = duration
		this.alertElement = null
	}

	show() {
		this.alertElement = document.createElement('div')
		this.alertElement.className = `alert alert-${this.type}`
		this.alertElement.innerText = this.message
		this.alertElement.innerHTML += `<button type="button" class="btn-close d-inline-block"  style="margin-left: 10px" data-bs-dismiss="alert" aria-label="Close" onclick="remove()"></button>`

		document.getElementById('alert-container').appendChild(this.alertElement)

		setTimeout(() => {
			this.remove()
		}, this.duration)
	}

	remove() {
		if (this.alertElement) {
			this.alertElement.style.opacity = '0'
			setTimeout(() => {
				this.alertElement.remove()
			}, 300)
		}
	}
}

// Alert yaratish uchun funksiya
function showAlert(message, type = 'info', duration = 3000) {
	const alert = new Alert(message, type, duration)
	alert.show()
}

export { Alert, showAlert }
