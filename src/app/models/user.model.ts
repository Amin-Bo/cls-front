export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	cin: string;
	date_in: string;
	date_out: string;
	job_title: string;
	department: string;
	password: string;
	type: string;
	__v: number;
}

export interface Login {
	success: boolean;
	message: string;
	user: User;
	token: string;
}