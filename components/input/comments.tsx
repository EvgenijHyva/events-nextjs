import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import styles from './comments.module.css';
import { Comment, DbComment } from '../../helpers/types';
import { NotificationContext } from '../../store/notification-context';

interface CommnetsProps {
	eventId: string;
}

const Loading = () => {
	return (<div>Loading...</div>);
}

function Comments(props: CommnetsProps) {
	const { eventId } = props;

	const notificationContext = useContext(NotificationContext);

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState<DbComment[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	function toggleCommentsHandler() {
		setShowComments((prevStatus) => !prevStatus);
	}

	useEffect(() => {
		if (showComments) {
			setLoading(true);
			fetch(`/api/comments/${eventId}`)
				.then(data => data.json())
				.then(({ comments }: { comments: DbComment[] }) => {
					setComments(comments);
				})
				.catch(console.error)
				.finally(() => {
					setLoading(false);
				})
		}
	}, [showComments])

	function addCommentHandler(commentData: Comment) {
		notificationContext.showNotification({
			title: "Sending comment...",
			message: "We will store the comment carefully in db.",
			status: "pending"
		})

		fetch(`/api/comments/${eventId}`, {
			method: "POST",
			body: JSON.stringify(commentData),
			headers: { "Content-Type": "application/json" }
		}).then(response => {
			if (response.ok) {
				return response.json();
			}
			return response.json().then(_ => {
				throw new Error("Error during saving the comment");
			})
		}).then(_ => {
			notificationContext.showNotification({
				title: "Success!",
				message: "Comment was saved.",
				status: "success"
			})
		}).catch(err => {
			console.error(err);
			notificationContext.showNotification({
				title: "Epic fail",
				message: err.message || "Failed epically to save you comment :( you can try it again aftersome time",
				status: "error"
			});
		});
	}

	return (
		<section className={styles.comments}>
			<button onClick={toggleCommentsHandler}>
				{showComments ? 'Hide' : 'Show'} Comments
			</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && !loading && < CommentList comments={comments} />}
			{showComments && loading && <Loading />}
		</section>
	);
}

export default Comments;