import { Supplier } from "./supplier.model";

export interface Contract_detail {
	payment_date: string;
	payment_amount: string;
	method: string;
}

export interface Contract {
	contract_details: Contract_detail;
	_id: string;
	supplier: Supplier;
	date_signature: string;
	expires_at: string;
	payment_status: string;
}