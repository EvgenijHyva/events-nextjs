import { Document } from 'mongodb';

export interface ResponseData {

}

export interface Comment {
	email: string;
	name: string;
	text: string;
}

export interface DbComment extends Omit<Comment, "email"> {
	id: string;
}

export class DbComment implements DbComment {
	constructor(document: Document) {
		this.id = document._id
		this.name = document.name
		this.text = document.text
	}
}

type NotificationStatus = "success" | "pending" | "error";

export interface NotificationProps {
	title: string;
	message: string;
	status: NotificationStatus;
}