import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
	return (
		<div>
			{/* Nextjs injects the content of the Head tag to real head part of the rendered page */}
			{/* This helps search events */}
			{/* It is a part of the response from the server */}
			<Head>
				<title>Next.js Events</title>
				<meta name='description' content='Find a lot of great events that allow you to evolve...' />
			</Head>
			<EventList items={props.featuredEvents} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			featuredEvents,
		},
		revalidate: 1800,
	};
}

export default HomePage;
