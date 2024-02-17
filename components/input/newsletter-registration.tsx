import { FormEventHandler, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import { isValidEmail } from '../../helpers/validation';

export default function NewsletterRegistration() {
	const emailInputRef = useRef<null | HTMLInputElement>(null);

	const registrationHandler: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const email = emailInputRef.current?.value as string;

		if (!isValidEmail(email)) {
			console.error(`Email is not valid: ${email}`);
		}

		fetch("/api/newsletter", {
			method: "POST",
			body: JSON.stringify({ email }),
			headers: {
				"Content-Type": "application/json"
			}
		}).catch(console.error)
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
