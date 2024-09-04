'use client';

import { useOptimistic } from 'react';
import Image from 'next/image';

import LikeButton from './like-icon';
import { formatDate } from '@/lib/format';
import { togglePostLikeStatus } from '@/actions/posts';

function imageLoader(config) {
	const [urlStart, urlEnd] = config.src.split('upload/');
	const transformations = `w_200,q_${config.quality}`;
	return `${urlStart}upload/${transformations}/${urlEnd}`;
}

function Post({ post, action }) {
	return (
		<article className='post'>
			<div className='post-image'>
				{/* fill prop should be added when image size is unknown.
				Also, the container should be a position element */}
				<Image
					src={post.image}
					alt={post.title}
					/*fill*/
					width={200} // same a cloudinary width
					height={120} // approx value is fine
					loader={imageLoader}
					quality={50}
				/>
			</div>
			<div className='post-content'>
				<header>
					<div>
						<h2>{post.title}</h2>
						<p>
							Shared by {post.userFirstName} on{' '}
							<time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
						</p>
					</div>
					<div>
						<form action={action.bind(null, post.id)} className={post.isLiked ? 'liked' : ''}>
							<LikeButton />
						</form>
					</div>
				</header>
				<p>{post.content}</p>
			</div>
		</article>
	);
}

export default function Posts({ posts }) {
	const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
		posts,
		(prevPosts, updatedPostId) => {
			const updatedPostIndex = prevPosts.findIndex(post => post.id === updatedPostId);

			if (updatedPostIndex === -1) {
				return prevPosts;
			}

			const updatedPost = { ...prevPosts[updatedPostIndex] };
			updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
			updatedPost.isLiked = !updatedPost.isLiked;
			const newPosts = [...prevPosts];
			newPosts[updatedPostIndex] = updatedPost;
			return newPosts;
		}
	);

	if (!optimisticPosts || optimisticPosts.length === 0) {
		return <p>There are no posts yet. Maybe start sharing some?</p>;
	}

	async function updatePost(postId) {
		updateOptimisticPosts(postId);
		await togglePostLikeStatus(postId);
	}

	return (
		<ul className='posts'>
			{optimisticPosts.map(post => (
				<li key={post.id}>
					<Post post={post} action={updatePost} />
				</li>
			))}
		</ul>
	);
}
