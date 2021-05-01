import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-util';

async function handler(req, res) {
	const eventId = req.query.eventId;
	let client;
	try {
		client = await connectDatabase();
	} catch (error) {
		res.status(500).json({ message: 'Connecting to the Database Failed' });
		return;
	}
	if (req.method === 'POST') {
		const { email, name, text } = req.body;
		if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
			res.status(422).json({ message: 'Invalid input' });
			client.close();
			return;
		}
		const newComment = {
			email,
			name,
			text,
			eventId,
		};
		let result;
		try {
			result = await insertDocument(client, 'comments', newComment);
			newComment._id = result.insertedId;
			res.status(201).send({ message: 'Added comment', comment: newComment });
		} catch (error) {
			res.status(500).json({ message: 'Inserting Comment Failed' });
		}
	}

	if (req.method === 'GET') {
		try {
			const documents = await getAllDocuments(client, 'comments', { _id: -1 }, { eventId });
			res.status(200).json({ comments: documents });
		} catch (error) {
			res.status(500).json({ message: 'Getting Comments Failed' });
		}
	}

	client.close();
}

export default handler;
