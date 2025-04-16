export class Loading {
	constructor(elementId, text, originText) {
		this.text = text
    this.elementId = elementId
    this.originText = originText
	}

  smallLoading(){
    let btn = document.getElementById(this.elementId)
    btn.setAttribute('disabled', '')
    btn.innerHTML = `
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span class="visually-hidden" role="status">${this.text}...</span>
    `
  }
  bigLoading(){
    let btn = document.getElementById(this.elementId)
    btn.setAttribute('disabled', '')
    btn.innerHTML = `
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">${this.text}...</span>
    `
  }
  removeLoading(){
    let btn = document.getElementById(this.elementId)
    btn.removeAttribute('disabled')
    btn.innerText = this.originText
  }
}
