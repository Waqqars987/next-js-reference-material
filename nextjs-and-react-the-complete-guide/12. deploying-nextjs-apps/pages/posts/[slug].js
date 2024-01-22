import Head from 'next/head';

import { getPostData, getPostsFiles } from '../../lib/posts-util';
import PostContent from '../../components/posts/post-detail/post-content';

function PostDetailPage({ post }) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<meta name='description' content={post.excerpt} />
			</Head>
			<PostContent post={post} />;
		</>
	);
}

export function getStaticPaths() {
	const postFileNames = getPostsFiles();
	const slugs = postFileNames.map(fileName => fileName.replace(/\.md$/, ''));

	return { paths: slugs.map(slug => ({ params: { slug } })), fallback: 'blocking' };
}

export function getStaticProps(context) {
	const { params } = context;
	const { slug } = params;

	const postData = getPostData(slug);

	return { props: { post: postData }, revalidate: 600 };
}

export default PostDetailPage;
