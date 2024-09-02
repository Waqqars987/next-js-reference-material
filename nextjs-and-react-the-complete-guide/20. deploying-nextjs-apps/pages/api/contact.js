import { MongoClient } from 'mongodb';

async function handler(req, res) {
	if (req.method === 'POST') {
		const { email, name, message } = req.body;

		if (
			!email ||
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!message ||
			message.trim() === ''
		) {
			return res.status(422).json({ message: 'invalid input.' });
		}

		const newMessage = { email, name, message };
		let client;
		try {
			client = await MongoClient.connect(process.env.CONNECTION_STRING);
			const db = client.db();
			const result = await db.collection('messages').insertOne(newMessage);
			newMessage._id = result.insertedId;
			res.status(201).json({ message: 'Successfully stored message!' });
		} catch (error) {
			res.status(500).json({ message: 'Failed to store message!' });
		} finally {
			client.close();
		}
	}
}

export default handler;
