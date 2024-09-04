import { cache } from 'react';
import sql from 'better-sqlite3';
import { unstable_cache as nextCache } from 'next/cache';

const db = new sql('messages.db');

function initDb() {
	db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
	db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

// react's cache fn de-duplicate data requests (Request Memoization)
// nextCache caches response data (Data Cache).
// When using nextCache, cache has to be manually invalidated (even in dev mode) using revalidatePath or revalidateTag
export const getMessages = nextCache(
	cache(function () {
		console.log('Fetching messages from db');
		return db.prepare('SELECT * FROM messages').all();
	}),
	['messages'],
	{
		tags: ['msg']
	}
);
