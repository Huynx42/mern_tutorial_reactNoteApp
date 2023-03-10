import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'

const SinglePost = ({ post: { _id, status, title, description, typeDesc, url } }) => {
	const { findPost, setShowUpdatePostModal } = useContext(
		PostContext
	);

	const choosePost = postId => {
		findPost(postId)
		setShowUpdatePostModal(true)
	};

	return <Card
		className='shadow'
		border={
			status === 'LEARNED'
				? 'info'
				: status === 'LEARNING'
				? 'warning'
				: 'danger'
		}
	>
		<Card.Body>
			<Card.Title style={{color: '#ffffff', 'font-size': '18px'}}>
				<Row>
					<Col>
						<p className='post-title'>{title}</p>
						<Badge
							style={{cursor:"pointer", padding:'5px'}}
							bg="info"
							className='post-button'
							onClick={choosePost.bind(this, _id)}
						>
							{typeDesc}
						</Badge>
						<Badge
							style={{cursor:"pointer", marginLeft:'10px', marginRight:'55px', padding:'5px'}}
							bg="info"
							variant={
							status === 'LEARNED'
								? 'info'
								: status === 'LEARNING'
								? 'warning'
								: 'danger'
							}
							className='post-button'
							onClick={choosePost.bind(this, _id)}
						>
							{status}
						</Badge>
						<ActionButtons url={url} _id={_id} />
					</Col>
				</Row>
			</Card.Title>
			{/* <Card.Text>{description}</Card.Text> */}
		</Card.Body>
	</Card>
}

export default SinglePost
