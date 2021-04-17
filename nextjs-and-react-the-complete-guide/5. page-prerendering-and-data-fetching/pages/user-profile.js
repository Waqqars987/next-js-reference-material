function UserProfilePage(props) {
	return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// In Static Generation, we dont have access to the actual incoming request
// Therefore to getServerSideProps
// Its the same as getStaticProps except for the fact that we cannot "revalidate" here
// This wont be called during build time but in real time when the request is made
// This function only gets executed on the server after deployment and also on the
// development server but not statically pre-generated
// The default node request and response objects are available here
// We can use them if we need a special header or a cookie data
// When we have a highly dynamic data which changes every second and we dont want to
// risk serving an outdated page
export async function getServerSideProps(context) {
	// data available in the context
	const { params, req, res } = context;
	console.log('Server Side Code');

	return {
		props: {
			username: 'Waqqar',
		},
	};
}
