import { User } from "./user.model";

export interface Leave{
    _id?: string;
    status ?: string;
    from ?: string;
    sent_date ?: string;
    leave_start_date ?: string;
    leave_end_date ?: string;
    leave_days ?: number;
    type ?: string;
    file ?: string;
}