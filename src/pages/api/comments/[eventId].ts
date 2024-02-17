import type { NextApiRequest, NextApiResponse } from 'next';
import { isEmptyText, isValidEmail } from '../../../../helpers/validation';
import { v4 as uuid } from "uuid";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { eventId } = req.query;

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

		console.log("OK", email, name, text)

		const newComment = {
			id: uuid(),
			email,
			name,
			text
		}
		res.status(201).json({ message: "Added comment", comment: newComment })
	}
	if (req.method === "GET") {
		const comments = [{ id: "1", name: "Test", comment: "first test comment" }, { id: "2", name: "Test1", comment: "secont test comment" }]
		res.status(200).json({ comments });
	}
};