import '../styles/globals.css';
import Layout from '../components/layout/layout';

// Root Component where our different page components are rendered in
// 'Component' here is our custom component that next.js renders
function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
