import { useEffect, useState } from 'react';
import useSWR from 'swr';

function LastSalesPage(props) {
	// Using server fetched data as initial state
	const [sales, setSales] = useState(props.sales);
	// const [isLoading, setIsLoading] = useState(false);

	// Alternative
	const { data, error } = useSWR(
		'https://nextjs-course-77559-default-rtdb.firebaseio.com/sales.json'
	);

	useEffect(() => {
		if (data) {
			const transformedSales = [];
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					transformedSales.push({
						id: key,
						username: data[key].username,
						volume: data[key].volume,
					});
				}
			}
			setSales(transformedSales);
		}
	}, [data]);

	// In Client Side Data Fetching,
	// The data used by this page is not prepared by Next.js, hence when Next.js pre-renders this page
	// it will execute this effect it will just return and render the 1st version of the page
	// (the initial state)
	// useEffect(() => {
	// 	setIsLoading(true);
	// 	fetch('https://nextjs-course-77559-default-rtdb.firebaseio.com/sales.json')
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			const transformedSales = [];
	// 			for (const key in data) {
	// 				if (data.hasOwnProperty(key)) {
	// 					transformedSales.push({
	// 						id: key,
	// 						username: data[key].username,
	// 						volume: data[key].volume,
	// 					});
	// 				}
	// 			}
	// 			// Functional Programming Alternative
	// 			// console.log(
	// 			// 	Object.keys(data).map(id => ({
	// 			// 		id,
	// 			// 		username: data[id].username,
	// 			// 		volume: data[id].volume,
	// 			// 	}))
	// 			// );
	// 			setSales(transformedSales);
	// 			setIsLoading(false);
	// 		});
	// }, []);

	if (error) {
		return <p>Failed to Load</p>;
	}

	if (!data && !sales) {
		return <p>Loading...</p>;
	}

	return (
		<ul>
			{sales.map(sale => (
				<li key={sale.id}>
					{sale.username} - ${sale.volume}
				</li>
			))}
		</ul>
	);
}

export async function getStaticProps() {
	// Next.js makes fetch available on the server side
	const response = await fetch(
		'https://nextjs-course-77559-default-rtdb.firebaseio.com/sales.json'
	);
	const data = await response.json();
	const transformedSales = [];
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			transformedSales.push({
				id: key,
				username: data[key].username,
				volume: data[key].volume,
			});
		}
	}
	return {
		props: { sales: transformedSales },
		revalidate: 10,
	};
}

export default LastSalesPage;
