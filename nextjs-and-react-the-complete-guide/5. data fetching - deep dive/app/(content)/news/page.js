import NewsList from '@/components/news-list';
import { getAllNews } from '@/lib/news';

export default async function NewsPage() {
	const news = await getAllNews(); // fetch directly from source (DB) if you own the data source

	// fetch from external API when you don't own the data source
	// const response = await fetch('http://localhost:8080/news');
	// if (!response.ok) {
	// 	throw new Error('Failed to fetch news.');
	// }
	// const news = await response.json();

	return (
		<>
			<h1>News Page</h1>
			<NewsList news={news} />
		</>
	);
}
