import { Comment, DbComment } from '../../helpers/types';
import styles from './comment-list.module.css';

interface CommentListProps {
	comments: DbComment[]
}

export default function CommentList({ comments }: CommentListProps) {
	return (comments.length ?
		<ul className={styles.comments}>
			{comments.map((comment) => {
				return <li key={comment.id}>
					<p>{comment.text}</p>
					<div>
						By <address>{comment.name}</address>
					</div>
				</li>
			})}
		</ul> : <p>No comments so far</p>
	);
};
