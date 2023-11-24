import Link from 'next/link';

function HomePage() {
	return (
		<div>
			<h1>The Home Page</h1>
			<ul>
				<li>
					{/* "replace" will replace the current page on the page stack,
					so we cant go back */}
					{/* Link component can prefetch page data as soon as we hover on it */}
					<Link href='/portfolio' replace>
						Portfolio
					</Link>
				</li>
				<li>
					<Link href='/clients'>Clients</Link>
				</li>
			</ul>
		</div>
	);
}

export default HomePage;
