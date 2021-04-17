import { useRouter /*, withRouter (for class components) */ } from 'next/router';

function PortfolioProjectPage() {
	// for class based compomnents router object will be available as prop
	const router = useRouter();
	console.log(router.pathname);
	// gives access to the data encoded in the URL
	console.log(router.query);

	//send a request to some backend server to fetch data with an id router.query.projectid

	return (
		<div>
			<h1>The Portfolio Project Page</h1>
		</div>
	);
}

export default PortfolioProjectPage;
