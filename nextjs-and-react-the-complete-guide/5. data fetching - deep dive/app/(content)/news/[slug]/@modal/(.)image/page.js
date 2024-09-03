import { notFound } from 'next/navigation';

import { getNewsItem } from '@/lib/news';
import ModalBackdrop from '@/components/modal-backdrop';

async function InterceptedImagePage({ params }) {
	const newsItemSlug = params.slug;
	const newsItem = await getNewsItem(newsItemSlug);

	if (!newsItem) {
		notFound();
	}

	return (
		<>
			<ModalBackdrop />
			<dialog className='modal' open>
				<div className='fullscreen-image'>
					<img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
				</div>
			</dialog>
		</>
	);
}

export default InterceptedImagePage;

// Gets rendered only when navigating via internal links