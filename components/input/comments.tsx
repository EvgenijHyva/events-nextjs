import { useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';
import { Comment, DbComment } from '../../helpers/types';

interface CommnetsProps {
	eventId: string;
}

function Comments(props: CommnetsProps) {
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState<DbComment[]>([]);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	useEffect(() => {
		if (showComments) {
			fetch(`/api/comments/${eventId}`)
				.then(data => data.json())
				.then(({ comments }: { comments: DbComment[] }) => {
					setComments(comments);
				})
				.catch(console.error)
		}
	}, [showComments])

	function addCommentHandler(commentData: Comment) {
		// send data to API
		fetch(`/api/comments/${eventId}`, {
			method: "POST",
			body: JSON.stringify(commentData),
			headers: { "Content-Type": "application/json" }
		}).then(data => data.json())
			.then(console.log)
			.catch(console.error);
	}

	return (
		<section className={styles.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && <CommentList comments={comments} />}
		</section>
	);
}

export default Comments;