import NewsList from '@/components/news-list';
import { getLatestNews } from '@/lib/news';

async function LatestNewsPage() {
	const latestNews = await getLatestNews();

	return (
		<>
			<h2>Latest News</h2>
			<NewsList news={latestNews} />
		</>
	);
}

export default LatestNewsPage;

// We always want to show the default content for latest parallel route. Hence, no need for page.js file
