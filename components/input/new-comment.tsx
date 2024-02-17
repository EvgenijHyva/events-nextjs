import { FormEventHandler, useRef, useState } from 'react';
import styles from './new-comment.module.css';
import { Comment } from '../../helpers/types';
import { isEmptyText, isValidEmail } from '../../helpers/validation';

interface NewCommentProps {
	onAddComment: (comment: Comment) => void;
}

export default function NewComment(props: NewCommentProps) {
	const [isInvalid, setIsInvalid] = useState(false);

	const emailInputRef = useRef<null | HTMLInputElement>(null);
	const nameInputRef = useRef<null | HTMLInputElement>(null);
	const commentInputRef = useRef<null | HTMLTextAreaElement>(null);

	const sendCommentHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		const enteredEmail = emailInputRef.current?.value as string;
		const enteredName = nameInputRef.current?.value as string;
		const enteredComment = commentInputRef.current?.value as string;

		if (
			!isValidEmail(enteredEmail) ||
			isEmptyText(enteredName) ||
			isEmptyText(enteredComment)
		) {
			console.error(`Some of this values are empty: ${(JSON.stringify({ enteredEmail, enteredName, enteredComment }))}`);
			setIsInvalid(true);
			return;
		}

		props.onAddComment({
			email: enteredEmail,
			name: enteredName,
			text: enteredComment,
		});
	}

	return (
		<form className={styles.form} onSubmit={sendCommentHandler}>
			<div className={styles.row}>
				<div className={styles.control}>
					<label htmlFor='email'>Your email</label>
					<input type='email' id='email' ref={emailInputRef} />
				</div>
				<div className={styles.control}>
					<label htmlFor='name'>Your name</label>
					<input type='text' id='name' ref={nameInputRef} />
				</div>
			</div>
			<div className={styles.control}>
				<label htmlFor='comment'>Your comment</label>
				<textarea id='comment' rows={5} ref={commentInputRef}></textarea>
			</div>
			{isInvalid && <p>Please enter a valid email address and comment!</p>}
			<button>Submit</button>
		</form>
	);
};
