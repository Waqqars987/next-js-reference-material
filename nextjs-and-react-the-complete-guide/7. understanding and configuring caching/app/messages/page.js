import { unstable_noStore } from 'next/cache';

// export const revalidate = 5; // same as the fetch option but applied file wide

/**
 * default value is 'auto'
 * force-dynamic is same as no-store, also disables Full Route Cache
 */
// export const dynamic = 'force-dynamic';

import Messages from '@/components/messages';
import { getMessages } from '@/lib/messages';

export default async function MessagesPage() {
	// unstable_noStore(); // same as 'force-dynamic' but applicable to the component only

	// This request will be memoized as it's the same as the one page.js -> Request Memoization
	/* 
		Next.js caches the fetch response internally in a server-side cache -> Data Cache
		For cache busting, we can call revalidatePath or configure fetch request
  	*/
	// const response = await fetch('http://localhost:8080/messages', {
	// 	// cache: 'no-store' // default value is 'force-cache'
	// 	next: {
	// 		// revalidate: 5, // number of seconds until we can re-use the cached data
	// 		tags: ['msg']
	// 	}
	// });
	// const messages = await response.json();

	const messages = await getMessages();

	if (!messages || messages.length === 0) {
		return <p>No messages found</p>;
	}

	return <Messages messages={messages} />;
}
