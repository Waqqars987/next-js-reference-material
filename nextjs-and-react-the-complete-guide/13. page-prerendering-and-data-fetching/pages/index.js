// By default, next.js pre-renders all pages that have no dynamic data
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function HomePage(props) {
	const { products } = props;
	return (
		<ul>
			{products.map(product => (
				<li key={product.id}>
					<Link href={`/products/${product.id}`}>{product.title}</Link>
				</li>
			))}
		</ul>
	);
}

// getStaticProps can be added to any page file and should be exported.
// Next.js will also call this function on our behalf when it pre-generates a page during build time
// This function signals Next.js that this is page that should be pre-generated
// It confirms Next.js that this page should be pre-generated
// The code inside getStaticProps is not exposed to the Client
// This function prepares the props which is the received by our Component
// Next.js will first execute this function and then as a second step execute our component function
// The fetched data here is exposed a prop to our component
// It must always return an object with a props key
// Here we can use the fs module because it will available on the serve side
// The imports used in getStaticProps is removed from the client side code bundle
export async function getStaticProps() {
	// Here cwd will be the root project directory due to how the code is executed by Next.js
	console.log('Re-Generating');
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);

	if (!data) {
		// can be used to conditionally re-direct, the provided route will be loaded
		// with a re-directed status code provided by Next.js
		return { redirect: { destination: '/no-data' } };
	}

	if (data.products.length === 0) {
		// this will show the Not Found page if needed
		return { notFound: true };
	}

	return {
		props: {
			products: data.products,
		},
		// this tells Next.js that for every incoming request this page should be re-generated
		// unless its less than 10 seconds ago that it was last re-generated
		// this value depends on how dynamic the website is
		// during developemnt the page is re-generated for every request
		// This process is called "Incremental Static Generation"
		revalidate: 10,
	};
}

export default HomePage;

// After build, Next.js injects a script tag in index.html which includes the that was used to populate
// the page. It is needed for hydration where the pre-rendered html is connected with React App and
// the data which was prefetched is handed off to the React app so that React app knows that this was
// dynamic data and which kind of data should be rendered, so if we manipulate that data through React,
// it would know which kind of data was received orginally
