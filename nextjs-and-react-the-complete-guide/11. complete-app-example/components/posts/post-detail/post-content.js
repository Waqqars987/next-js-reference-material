import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import PostHeader from './post-header';
import classes from './post-content.module.css';
import Image from 'next/image';

function PostContent({ post }) {
	const imagePath = `/images/posts/${post.slug}/${post.image}`;
	const customRenderers = {
		// img(image) {
		// 	return (
		// 		<Image
		// 			src={`/images/posts/${post.slug}/${image.src}`}
		// 			alt={image.alt}
		// 			width={600}
		// 			height={300}
		// 			priority={false}
		// 		/>
		// 	);
		// }

		// this is done to correct the invalid DOM nesting created by the above approach
		// by default image is rendered in a paragraph which is to be avoided
		p(paragraph) {
			const { node } = paragraph;

			if (node.children[0].tagName === 'img') {
				const image = node.children[0];

				return (
					<div className={classes.image}>
						<Image
							src={`/images/posts/${post.slug}/${image.properties.src}`}
							alt={image.alt}
							width={600}
							height={300}
						/>
					</div>
				);
			}

			return <p>{paragraph.children}</p>;
		},

		code(code) {
			const { className, children } = code;
			const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
			return <SyntaxHighlighter style={dracula} language={language} children={children} />;
		}
	};

	return (
		<article className={classes.content}>
			<PostHeader title={post.title} image={imagePath} />

			<ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
		</article>
	);
}

export default PostContent;
