export const isValidEmail = (email: string) => {
	return email?.includes("@");
}

export const isEmptyText = (text: string) => {
	return !text?.trim();
}