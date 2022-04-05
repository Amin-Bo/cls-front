import { Supplier } from "./supplier.model";


export interface Invoice {
	_id: string;
	supplier: Supplier;
	date: string;
	payment_status: string;
	payment_method: string;
	amount: string;
	amount_excluding_taxes: string;
	file: string;
}
