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