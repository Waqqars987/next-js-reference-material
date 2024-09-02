import fs from 'fs/promises';
import path from 'path';

function ProductDetailPage(props) {
	const { loadedProduct } = props;

	// Fallback state
	if (!loadedProduct) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<h1>{loadedProduct.title}</h1>
			<p>{loadedProduct.description}</p>
		</>
	);
}

async function getData() {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	return data;
}

export async function getStaticProps(context) {
	// get url params (dynamic segment) from context for preparing the data on the server
	// we cannot use useRouter() here
	const { params } = context;
	const productId = params.pid;
	const data = await getData();
	const product = data.products.find(prd => prd.id === productId);

	// When fallback is set to true and we try to get data for an invalid dynamic segment
	// then we should put a check here
	if (!product) {
		return { notFound: true };
	}

	return {
		props: {
			loadedProduct: product,
		},
	};
}

// If we have a dynamic segment leading to our page then Next.js wont pre-generate that page
// This is because technically for this page, we wil have different data based on the dynamic segment
// So Next.js does not know in advance that how many pages it needs to pre-generate for this dynamic page
// It does not know which values for 'pid' will eventually be supported
// Because of this, such pages are dynamically generated 'Just in Time'
// Here we have to use getStaticPaths function
// This function will tell Next.js which instances of this dynamic page must be pre-generated
// This will enable Next.js to prefetch the even before the dynamic pages are visited
export async function getStaticPaths() {
	const data = await getData();
	const pathsWithParams = data.products.reduce(
		(acc, product) => acc.concat({ params: { pid: product.id } }),
		[]
	);

	return {
		// Next.js will use these dynamic segments to call getStaticProps()
		paths: pathsWithParams,
		// paths: [{ params: { pid: 'p1' } }, { params: { pid: 'p2' } }, { params: { pid: 'p3' } }],
		// fallback: false,

		// With fallback set to true we tell Next.js that even pages that are not listed here (the
		// parameter values that are not listed) can be valid values that should be loaded when they are visited
		// but there are not pre-generated. Instead, they are generated Just In Time when a request reaches
		// the Server.
		// This allows us to pre-generate highly visited pages and postpone pre-generation to less frequent
		// pages to the server, so they are only generated when needed
		// if we directly enter the dynamic segment in the URL, it does not work. This is because
		// this dynamic pre-generation when is need does not finish instantly, so we should be prepared
		// to show a fallback state in our component
		fallback: true,

		// With fallback set to 'blocking', we don't need the fallback state in our component
		// because then Next.js will wait for this page to be fully be pre-generated on the server
		// before it serves that
		// fallback: 'blocking',
	};
}

export default ProductDetailPage;
