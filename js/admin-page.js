const body = document.querySelector('body')
const darkLight = document.querySelector('#darkLight')
const sidebar = document.querySelector('.my-sidebar')
const submenuItems = document.querySelectorAll('.submenu_item')
const sidebarOpen = document.querySelector('#sidebarOpen')
const sidebarClose = document.querySelector('.collapse_sidebar')
const sidebarExpand = document.querySelector('.expand_sidebar')
const article = document.querySelector('article')
sidebarOpen.addEventListener('click', () => sidebar.classList.toggle('close'))
sidebarClose.addEventListener('click', () => {
	sidebar.classList.add('close', 'hoverable')
})
sidebarExpand.addEventListener('click', () => {
	sidebar.classList.remove('close', 'hoverable')
})
if (sidebar.classList.contains) {
	article.classList.add('move-right')
}
sidebar.addEventListener('mouseenter', () => {
	if (sidebar.classList.contains('hoverable')) {
		sidebar.classList.remove('close')
		article.classList.add('move-right')
	}
})
sidebar.addEventListener('mouseleave', () => {
	if (sidebar.classList.contains('hoverable')) {
		sidebar.classList.add('close')
		article.classList.remove('move-right')
	}
})
darkLight.addEventListener('click', () => {
	body.classList.toggle('dark')
	if (body.classList.contains('dark')) {
		document.querySelector('html').setAttribute('data-bs-theme', 'dark')
	} else {
		document.querySelector('html').removeAttribute('data-bs-theme', 'dark')
	}
	if (body.classList.contains('dark')) {
		darkLight.classList.replace('bx-sun', 'bx-moon')
	} else {
		darkLight.classList.replace('bx-moon', 'bx-sun')
	}
})
submenuItems.forEach((item, index) => {
	item.addEventListener('click', () => {
		item.classList.toggle('show_submenu')
		submenuItems.forEach((item2, index2) => {
			if (index !== index2) {
				item2.classList.remove('show_submenu')
			}
		})
	})
})
if (window.innerWidth < 768) {
	sidebar.classList.add('close')
} else {
	sidebar.classList.remove('close')
}

// for account menu
let profile = document.querySelector('.profile')
let menu = document.querySelector('.menu')

profile.onclick = function (e) {
	menu.classList.toggle('active')
}

document.addEventListener('click', e => {
	if (!menu.contains(e.target) && e.target !== profile) {
		menu.classList.remove('active')
	}
})
