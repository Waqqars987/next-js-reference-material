import Image from 'next/image';
import Link from 'next/link';

import logoImg from '@/assets/logo.png';
import classes from './main-header.module.css';
import MainHeaderBackground from './main-header-background';

function MainHeader() {
	return (
		<>
			<MainHeaderBackground />

			<header className={classes.header}>
				<Link href='/' className={classes.logo}>
					{/* imported image in a Next.js project is an object where the path is stored in src prop */}
					<Image
						src={logoImg.src}
						alt='A plate with food on it'
						width={100}
						height={100}
						priority
					/>
					NextLevel Food
				</Link>

				<nav className={classes.nav}>
					<ul>
						<li>
							<Link href='/meals'>Browse Meals</Link>
						</li>
						<li>
							<Link href='/community'>Foodies Community</Link>
						</li>
					</ul>
				</nav>
			</header>
		</>
	);
}

export default MainHeader;
