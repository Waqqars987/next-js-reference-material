'use client';

function Error({ error }) {
	console.log('🚀 ~ Error ~ error:', error);
	return (
		<main className='error'>
			<h1>An error occurred</h1>
			<p>Failed to fetch meal data. Please try again later.</p>
		</main>
	);
}

export default Error;
