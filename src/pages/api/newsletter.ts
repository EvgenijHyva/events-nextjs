import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../helpers/types';
import { isValidEmail } from '../../../helpers/validation';

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	if (req.method === "POST") {
		const { email } = req.body;
		if (!isValidEmail(email)) {
			res.status(422).json({ message: "Invalid email address" });
			return;
		}
		console.log("Submited", email)
		res.status(201).json({ message: `Signed up email ${email}` });

	}
}