import Link from 'next/link';
import Image from 'next/image';

import logo from '@/assets/logo.png';

export default function Header() {
	return (
		<header id='main-header'>
			<Link href='/'>
				{/* <img src={logo.src} alt='Mobile phone with posts feed on it'  /> */}
				<Image
					src={logo}
					width={100}
					height={100}
					// sizes='10vw'  // Recommended way to resize image
					alt='Mobile phone with posts feed on it'
					priority // should be added for images that are always visable when page loads
				/>
			</Link>
			<nav>
				<ul>
					<li>
						<Link href='/feed'>Feed</Link>
					</li>
					<li>
						<Link className='cta-link' href='/new-post'>
							New Post
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}