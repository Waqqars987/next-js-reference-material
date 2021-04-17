function UserIdPage(props) {
	return <h1>{props.id}</h1>;
}

// Using for dynamic segment
// Since we need to use static pre-generation here, we dont need to use getStaticPaths here
export async function getServerSideProps(context) {
	const { params } = context;
	const userId = params.uid;

	return {
		props: {
			id: `user-id: ${userId}`,
		},
	};
}

export default UserIdPage;
