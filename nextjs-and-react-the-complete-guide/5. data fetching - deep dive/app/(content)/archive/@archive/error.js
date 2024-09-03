'use client'; // error can happen at both client & server, hence this directive

const FilterError = ({ error }) => {
	return (
		<div id='error'>
			<h2>An error occurred!</h2>
			<p>{error.message}</p>
		</div>
	);
};

export default FilterError;
