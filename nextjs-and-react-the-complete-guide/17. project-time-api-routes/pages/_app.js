import Head from 'next/head';

import Layout from '../components/layout/layout';
import '../styles/globals.css';

// This is the root app component which is rendered for every page that is being displayed
// Component prop is set by Next.js
// Next.js automcatically merges all Head sections
// To solve conflicts, the later element wins

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			{/* General Head Element for All Pages, will be overridden by the later elements of the same name */}
			<Head>
				<title>Next.js Events</title>
				<meta name='description' content='NextJS Events' />
				<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
