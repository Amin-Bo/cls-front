import { Supplier } from "./supplier.model";

export interface userTable{
    n:number;
    first_name: string;
    last_name: string;
    job_title: string;
    email: string;
    date_in: string;
}


export interface SuppliersTable {
n:number;
name: string;
email: string;
phone: string;
address: string;
contract_start_date: string;
}


export interface ContractsTable{
    _id: string;
    n : number;
    supplier:Supplier;
    date_signature : string;
    expires_at : string;
    payment_status : string;
}
export interface InvoicesTable{
    _id: string;
    n : number;
    supplier:Supplier;
    payment_method : string;
    payment_status : string;
    date : string;
    amount : string;
}

export interface RequestsTable{
    from : string;
    sent_date : string;
    status : string;
    type : string;
}

export interface requestTableEmployee {
    n : number
    sent_date: string;
    status: string;
}

export interface leavesEmployeeTable{
    n? : number;
    sent_date?: string;
    leave_start_date?: string;
    leave_end_date?: string;
    leave_days?: number;
    status?: string;
    type? : string;
}