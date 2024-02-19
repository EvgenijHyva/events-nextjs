import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../helpers/types';
import { isValidEmail } from '../../../helpers/validation';
import client from '../../../storage/dbclient';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method === "POST") {
		const { email } = req.body;
		if (!isValidEmail(email)) {
			res.status(422).json({ message: "Invalid email address" });
			return;
		}

		await client.connect();
		const collection = await client.db("newsletters").collection("emails");
		await collection.insertOne({ email })
			.then(data => {
				console.log(data)
				return res.status(201).json({ message: `Signed up email ${email}` });
			})
			.catch(err => {
				console.log(err);
				return res.status(500);
			});
		client.close();
	}
}