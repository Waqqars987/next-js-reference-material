import { redirect } from 'next/navigation';

import { addMessage } from '@/lib/messages';
import { revalidatePath, revalidateTag } from 'next/cache';

export default function NewMessagePage() {
	async function createMessage(formData) {
		'use server';

		const message = formData.get('message');
		addMessage(message);
		// revalidatePath('/messages'); // clears out Full Route Cache. it doesn't disable cache or set up a time frame but only updates a piece of the cache
		// revalidatePath('/messages', 'layout'); // affects nested pages too
		revalidateTag('msg'); // clears out any cached data that was tagged with a particular tag in the request config
		redirect('/messages');
	}

	return (
		<>
			<h2>New Message</h2>
			<form action={createMessage}>
				<p className='form-control'>
					<label htmlFor='message'>Your Message</label>
					<textarea id='message' name='message' required rows='5' />
				</p>

				<p className='form-actions'>
					<button type='submit'>Send</button>
				</p>
			</form>
		</>
	);
}
