import { useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';
import { Comment } from '../../helpers/types';

interface CommnetsProps {
	eventId: string;
}

function Comments(props: CommnetsProps) {
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	function addCommentHandler(commentData: Comment) {
		// send data to API
	}

	return (
		<section className={styles.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList />}
		</section>
	);
}

export default Comments;