'use server'; // when defined at the top of the file, all the functions defined here will be treated as server actions

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { saveMeal } from './meals';

function isInvalidText(text) {
	return !text || text.trim() === '';
}

export async function shareMeal(prevState, formData) {
	const meal = {
		title: formData.get('title'),
		summary: formData.get('summary'),
		instructions: formData.get('instructions'),
		image: formData.get('image'),
		creator: formData.get('name'),
		creator_email: formData.get('email')
	};

	if (
		isInvalidText(meal.title) ||
		isInvalidText(meal.summary) ||
		isInvalidText(meal.instructions) ||
		isInvalidText(meal.creator) ||
		isInvalidText(meal.creator_email) ||
		!meal.creator_email.includes('@') ||
		!meal.image ||
		meal.image.size === 0
	) {
		// throw new Error('Invalid input');
		// should return serializable object
		return {
			message: 'Invalid input.'
		};
	}

	await saveMeal(meal);
	// this function tells Next.js to revlidate the cache of a certain route path
	// page - revalidates only the given path (default)
	// layout - revalidates the page and nested pages
	revalidatePath('/meals');

	redirect('/meals');
}
