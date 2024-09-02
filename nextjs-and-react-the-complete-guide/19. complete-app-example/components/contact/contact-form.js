import { useState, useEffect } from 'react';
import classes from './contact-form.module.css';

import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
	const response = await fetch('/api/contact', {
		method: 'POST',
		body: JSON.stringify(contactDetails),
		headers: { 'Content-Type': 'application/json' }
	});
	const data = await response.json();
	if (!response.ok) {
		throw new Error(data.messae || 'Something went wrong!');
	}

	return data;
}

function ContactForm() {
	const [requestStatus, setRequestStatus] = useState();
	const [requestError, setRequestError] = useState();

	useEffect(() => {
		if (requestStatus === 'success' || requestStatus === 'error') {
			const timer = setTimeout(() => {
				setRequestStatus(null);
				setRequestError(null);
			}, 3000);

			return () => clearInterval(timer);
		}
	}, [requestStatus]);

	const sendMessageHandler = async event => {
		event.preventDefault();
		setRequestStatus('pending');
		try {
			const formData = Object.fromEntries(new FormData(event.target));
			await sendContactData(formData);
			setRequestStatus('success');
			event.target.reset();
		} catch (error) {
			setRequestStatus('error');
			setRequestError(error.message);
		}
	};

	let notification;
	if (requestStatus === 'pending') {
		notification = {
			status: 'pending',
			title: 'Sending message...',
			message: 'Your message is on its way!'
		};
	}
	if (requestStatus === 'success') {
		notification = { status: 'success', title: 'Success!', message: 'Messgage sent successfully!' };
	}
	if (requestStatus === 'error') {
		notification = { status: 'error', title: 'Error!', message: requestError };
	}

	return (
		<section className={classes.contact}>
			<h1>How I can I help you?</h1>
			<form className={classes.form} onSubmit={sendMessageHandler}>
				<div className={classes.controls}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input type='email' id='email' name='email' required />
					</div>

					<div className={classes.control}>
						<label htmlFor='name'>Your Name</label>
						<input type='text' id='name' name='name' required />
					</div>
				</div>

				<div className={classes.control}>
					<label htmlFor='message'>Your Message</label>
					<textarea id='message' name='message' rows={5} required></textarea>
				</div>

				<div className={classes.actions}>
					<button type='submit'>Send Message</button>
				</div>
			</form>

			{notification && <Notification {...notification} />}
		</section>
	);
}

export default ContactForm;
