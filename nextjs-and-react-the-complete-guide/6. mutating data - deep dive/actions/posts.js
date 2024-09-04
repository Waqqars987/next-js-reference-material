'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { uploadImage } from '@/lib/cloudinary';
import { storePost, updatePostLikeStatus } from '@/lib/posts';

// Server actions must be 'async'
export async function createPost(_prevState, formData) {
	const title = formData.get('title');
	const image = formData.get('image');
	const content = formData.get('content');

	let errors = [];
	if (!title || title.trim().length === 0) {
		errors.push('Title is required.');
	}

	if (!content || content.trim().length === 0) {
		errors.push('Content is required.');
	}

	if (!image || image.size === 0) {
		errors.push('Image is required.');
	}

	if (errors.length > 0) {
		return { errors };
	}

	let imageUrl;
	try {
		imageUrl = await uploadImage(image);
	} catch (error) {
		throw new Error('Image Upload failed, post was not created. Please try again later.');
	}

	await storePost({
		imageUrl,
		title,
		content,
		userId: 1
	});

	revalidatePath('/', 'layout');
	redirect('/feed');
}

export async function togglePostLikeStatus(postId, _formData) {
	await updatePostLikeStatus(postId, 2);
	// revalidatePath('/feed');	// revalidate only feed page path
	revalidatePath('/', 'layout'); // revalidate all pages of the app that are wrapped with Root layout
}
