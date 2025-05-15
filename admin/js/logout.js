export function logout(){
	localStorage.removeItem('token');
	localStorage.removeItem('id');
	window.location.href = 'admin/view/login.html';
}