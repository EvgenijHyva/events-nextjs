import { FormEventHandler, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { isValidEmail } from '../../helpers/validation';
import { NotificationContext } from '../../store/notification-context';
import { useContext } from 'react';

export default function NewsletterRegistration() {
	const notificationContext = useContext(NotificationContext);
	const emailInputRef = useRef<null | HTMLInputElement>(null);

	const registrationHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const email = emailInputRef.current?.value as string;

		if (!isValidEmail(email)) {
			console.error(`Email is not valid: ${email}`);
		}
		notificationContext.showNotification({
			title: "Signing up",
			message: "Registering for news letter",
			status: "pending"
		})

		fetch("/api/newsletter", {
			method: "POST",
			body: JSON.stringify({ email }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(response => {
			if (response.ok) {
				return response.json();
			}
			return response.json().then(data => {
				throw new Error(data.message || "Something went wrong")
			})
		}).then(data => {
			notificationContext.showNotification({
				title: "Signing up successful",
				message: `Your email (${email}) have been signed up for newsletters`,
				status: "success"
			})
			return data;
		}).catch(err => {
			console.error(err);
			notificationContext.showNotification({
				title: "Signing up failed",
				message: err.message || "Error occured during registration process, please try again",
				status: "error"
			})
		})
	}

	return (
		<section className={classes.newsletter}>
			<h2>Sign up to stay updated!</h2>
			<form onSubmit={registrationHandler}>
				<div className={classes.control}>
					<input
						ref={emailInputRef}
						type='email'
						id='email'
						placeholder='Your email'
						aria-label='Your email'
					/>
					<button>Register</button>
				</div>
			</form>
		</section>
	);
}
