import type { NextApiRequest, NextApiResponse } from 'next';
import { isEmptyText, isValidEmail } from '../../../../helpers/validation';
import client from '../../../../storage/dbclient';
import { DbComment } from '../../../../helpers/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { eventId } = req.query;
	await client.connect();
	const collection = await client.db("events").collection("comments");

	if (req.method === "POST") {
		const { email, name, text } = req.body;

		if (!isValidEmail(email) || isEmptyText(name) || isEmptyText(text)) {
			res.status(422).json({
				message: `Invalid input`, values: JSON.stringify({
					email, name, text
				})
			})
			return;
		}

		const newComment = {
			email,
			name,
			text,
			eventId
		}

		await collection.insertOne(newComment).then(data => {
			console.log(data)
			res.status(201).json({ message: "Added comment", commentId: data.insertedId })
		}).catch(err => {
			console.error(err)
			res.status(500).json({ message: "Failed to add comment" })
		});

	}
	if (req.method === "GET") {
		const comments = await collection.find({ eventId }).sort({ _id: -1 }).toArray(); //Descending order
		const responseComments = comments.map(comment => new DbComment(comment));
		res.status(200).json({ comments: responseComments });
	}
	client.close()
};