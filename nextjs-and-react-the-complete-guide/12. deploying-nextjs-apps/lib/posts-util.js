import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostData(postIdentififer) {
	const postSlug = postIdentififer.replace(/\.md$/, '');
	const filePath = path.join(postsDirectory, `${postSlug}.md`);
	const fileContent = fs.readFileSync(filePath, 'utf-8');
	const { data, content } = matter(fileContent);
	const postData = {
		slug: postSlug,
		...data,
		content
	};

	return postData;
}

export function getPostsFiles() {
	return fs.readdirSync(postsDirectory);
}

export function getAllPosts() {
	const postFiles = getPostsFiles();
	const allPosts = postFiles
		.map(postFile => getPostData(postFile))
		.sort((postA, postB) => (postA.date > postB.date ? -1 : 1));

	return allPosts;
}

export function getFeaturedPosts() {
	const allPosts = getAllPosts();
	const featuredPosts = allPosts.filter(post => post.isFeatured);

	return featuredPosts;
}
