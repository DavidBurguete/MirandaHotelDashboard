import { MessageStatus } from "../enums/ContactEnum";

export interface ContactInterface {
    _id: string;
    date: string;
    customer: string;
    email: string;
    phone_number: string;
    subject: string;
    comment: string;
    status: MessageStatus;
}