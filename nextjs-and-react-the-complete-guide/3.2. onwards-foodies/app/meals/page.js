import Link from 'next/link';
import { Suspense } from 'react';

import { getMeals } from '@/lib/meals';
import classes from './page.module.css';
import MealsGrid from '@/components/meals/meals-grid';

async function Meals() {
	const meals = await getMeals();

	return <MealsGrid meals={meals} />;
}

function MealsPage() {
	return (
		<>
			<header className={classes.header}>
				<h1>
					Delicious meals, created <span className={classes.highlight}>by you</span>
				</h1>
				<p>Choose your favorite receipe and cook it yourself. It is easy and fun!</p>
				<p className={classes.cta}>
					<Link href='/meals/share'>Share Your Favorite Recipe</Link>
				</p>
			</header>

			<main className={classes.main}>
				{/* handle loading state at a granular level */}
				{/* loading.js files internally wrap the entire page content in suspense */}
				<Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
					<Meals />
				</Suspense>
			</main>
		</>
	);
}

export default MealsPage;
