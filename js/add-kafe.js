import { showAlert } from '../components/alert.js'
import { API_URL } from './api-url.js'
import { itemIteration } from './edit-profile.js'

const id = localStorage.getItem('id')
const token = localStorage.getItem('accessToken')

document
	.getElementById('addKafe')
	.addEventListener('submit', e => handleSubmit(e, 'kafeName', 'kafeNames'))
document
	.getElementById('addPhone')
	.addEventListener('submit', e => handleSubmit(e, 'phone', 'phones'))

async function handleSubmit(e, urlPiece, listId) {
	e.preventDefault()
	const formElement = e.target
	const formData = new FormData(formElement)
	formData.append('id', id)

	try {
		const response = await fetch(
			`${API_URL}/api/crud/update-user/add-${urlPiece}/${id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(Object.fromEntries(formData.entries())),
			}
		)

		const result = await response.json()

		if (!response.ok) {
			throw result
		}

		if (result.newData?.message) {
			showAlert(result.newData.message, 'success', 3000)
			const newData = result.newData.kafes ?? result.newData.phones ?? []
			await itemIteration(listId, newData, id, urlPiece)
		}
	} catch (error) {
		if (error.errors) {
			error.errors.forEach(err =>
				showAlert('Xatolik: ' + err.msg, 'danger', 3000)
			)
		}
		showAlert(
			'Xatolik: ' + (error.message || 'Noma’lum xatolik'),
			'danger',
			3000
		)
	} finally {
		formElement.reset()
	}
}
