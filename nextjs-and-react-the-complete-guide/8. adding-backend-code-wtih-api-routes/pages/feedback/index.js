import { useState } from 'react';

import { buildFeedbackPath, extractFeedback } from '../api/feedback';

function FeedbackPage(props) {
	const [feedbackData, setFeedbackData] = useState();

	const loadFeedbackHandler = id => {
		fetch(`/api/feedback/${id}`)
			.then(response => response.json())
			.then(data => setFeedbackData(data.feedback));
	};

	return (
		<>
			{feedbackData && <p> {feedbackData.email}</p>}
			<ul>
				{props.feedbackItems.map(item => (
					<li key={item.id}>
						{item.text} <button onClick={() => loadFeedbackHandler(item.id)}>Show Details</button>
					</li>
				))}
			</ul>
		</>
	);
}

// We cannot use fetch inside getStaticProps or getServerSidedProps to
// communicate to our Internal APIs of Next.js
export async function getStaticProps() {
	const filePath = buildFeedbackPath();
	const data = extractFeedback(filePath);

	return {
		props: {
			feedbackItems: data,
		},
	};
}

export default FeedbackPage;