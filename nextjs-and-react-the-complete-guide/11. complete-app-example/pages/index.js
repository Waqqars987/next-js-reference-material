import Head from 'next/head';

import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';
import FeaturedPosts from '../components/home-page/featured-posts';

function HomePage({ posts }) {
	return (
		<>
			<Head>
				<title>Waqqar's Blog</title>
				<meta name='decsription' content='I post about porgramming and web development.' />
			</Head>
			<Hero />
			<FeaturedPosts posts={posts} />
		</>
	);
}

export function getStaticProps() {
	const featuredPosts = getFeaturedPosts();

	return {
		props: { posts: featuredPosts }
		// revalidate: 1800
	};
}

export default HomePage;
