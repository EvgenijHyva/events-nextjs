import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '../../../helpers/types';
import { isValidEmail } from '../../../helpers/validation';



export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	console.log(req.body)
	if (req.method === "POST") {
		const { email } = req.body;
		if (!isValidEmail(email)) {
			res.status(422).json({ message: "Invalid email address" });
			return
		}
		console.log(email)

	} else if (req.method === "GET") {

	}
}