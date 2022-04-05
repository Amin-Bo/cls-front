export interface From {
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

export interface Request {
	_id: string;
	status: string;
	from: From;
	done_date: string;
	type: string;
	sent_date: string;
	file: string;
	__v: number;
}

export interface Requests {
	request: Request[];
}