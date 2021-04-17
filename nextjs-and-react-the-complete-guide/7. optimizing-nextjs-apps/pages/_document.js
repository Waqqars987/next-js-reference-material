// must be added in the root level of the pages folder
// allows us to edit the entire HTML document

// The Head here is different from the next/head, this can only be used here
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			// Changing the language of the document
			<Html lang='en'>
				<Head />
				<body>
					{/* this can helps us to add HTML content outside the app component tree
                    using React Portals */}
					<div id='overlays' />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
