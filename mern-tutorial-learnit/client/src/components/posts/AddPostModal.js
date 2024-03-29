import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {
	// Contexts
	const {
		showAddPostModal,
		setShowAddPostModal,
		addPost,
		setShowToast
	} = useContext(PostContext)

	// State
	const [newPost, setNewPost] = useState({
		title: '',
		description: '',
		url: '',
		status: 'TO LEARN',
		typeDesc: 'VIDEO',
	})

	const { title, description, url } = newPost

	const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddPostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addPost(newPost)
		resetAddPostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddPostData = () => {
		setNewPost({ title: '', description: '', url: '', status: 'TO LEARN', typeDesc: 'VIDEO' })
		setShowAddPostModal(false)
	}

	return (
		<Modal show={showAddPostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Chương trình nào bạn đang hứng thú?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Tiêu đề'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewPostForm}
						/>
						<Form.Text id='title-help' muted>
							Mô tả:
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Mô tả chi tiết'
							name='description'
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Youtube Tutorial URL'
							name='url'
							required
							value={url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='light' type='submit'>
						LearnIt!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddPostModal
