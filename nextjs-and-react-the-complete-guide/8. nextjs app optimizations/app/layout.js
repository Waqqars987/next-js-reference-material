import Header from '@/components/header';
import './globals.css';

// Layout meta data is merged with page level metadata
export const metadata = {
	title: 'NextPosts',
	description: 'Browse and share amazing posts.'
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
}
