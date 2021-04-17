import { useRouter } from 'next/router';

function SelectedClientProjectPage() {
	const router = useRouter();

	// provides both dynamic segments in the URL
	console.log(router.query);

	return (
		<div>
			<h1>The Project Page for a Specific Project for a Selected Client</h1>
		</div>
	);
}

export default SelectedClientProjectPage;
