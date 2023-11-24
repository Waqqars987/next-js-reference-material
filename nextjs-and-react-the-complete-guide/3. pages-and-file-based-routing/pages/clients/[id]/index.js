import { useRouter } from 'next/router';

function ClientProjectsPage() {
	const router = useRouter();

	// provides all dynamic segments in the URL
	console.log(router.query);

	function loadProjectHandler() {
		//load data...
		// router.push('/clients/waqqar/a');

		// Alternative
		router.push({
			pathname: '/clients/[id]/[clientprojectid]',
			query: { id: router.query.id, clientprojectid: 'projecta' }
		});
	}

	return (
		<div>
			<h1>The Projects of a Given Client</h1>
			<button onClick={loadProjectHandler}>Load Project A</button>
			<pre>{JSON.stringify(router.query, null, 4)}</pre>
		</div>
	);
}

export default ClientProjectsPage;
