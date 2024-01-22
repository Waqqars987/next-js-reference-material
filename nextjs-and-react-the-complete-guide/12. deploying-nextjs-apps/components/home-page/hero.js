import Image from 'next/image';

import classes from './hero.module.css';

function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/waqqar.jpg'
					alt='An image showing Waqqar'
					width={300}
					height={300}
					priority
				/>
			</div>

			<h1>Hi, I am Waqqar</h1>

			<p>I blog about web develpoment - especially frontend frameworks like Angular or React.</p>
		</section>
	);
}

export default Hero;
