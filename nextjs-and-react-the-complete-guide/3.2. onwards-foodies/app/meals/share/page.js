'use client';

import { useFormState } from 'react-dom';

import classes from './page.module.css';
import { shareMeal } from '@/lib/actions';
import ImagePicker from '@/components/meals/image-picker';
import MealsFormSubmit from '@/components/meals/meals-form-submit';

export default function ShareMealPage() {
	const [state, formAction] = useFormState(shareMeal, { message: null });

	// below will only work if the component is not a client component (use client), alternative is to outsource the action and use the same.
	// async function shareMeal(formData) {
	// 	'use server';
	// 	const meal = {
	// 		title: formData.get('title'),
	// 		summary: formData.get('summary'),
	// 		instructions: formData.get('instructions'),
	// 		image: formData.get('image'),
	// 		creator: formData.get('name'),
	// 		creator_email: formData.get('email')
	// 	};
	// 	console.log(meal);
	// }

	return (
		<>
			<header className={classes.header}>
				<h1>
					Share your <span className={classes.highlight}>favorite meal</span>
				</h1>
				<p>Or any other meal you feel needs sharing!</p>
			</header>

			<main className={classes.main}>
				<form className={classes.form} action={formAction}>
					<div className={classes.row}>
						<p>
							<label htmlFor='name'>Your name</label>
							<input type='text' id='name' name='name' required />
						</p>
						<p>
							<label htmlFor='email'>Your email</label>
							<input type='email' id='email' name='email' required />
						</p>
					</div>
					<p>
						<label htmlFor='title'>Title</label>
						<input type='text' id='title' name='title' required />
					</p>
					<p>
						<label htmlFor='summary'>Short Summary</label>
						<input type='text' id='summary' name='summary' required />
					</p>
					<p>
						<label htmlFor='instructions'>Instructions</label>
						<textarea id='instructions' name='instructions' rows='10' required></textarea>
					</p>

					<ImagePicker name='image' label='Your image' />

					{state.message && <p>Error: {state.message}</p>}

					<p className={classes.actions}>
						<MealsFormSubmit />
					</p>
				</form>
			</main>
		</>
	);
}
