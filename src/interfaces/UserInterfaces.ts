export interface User {
    _id: string;
    user: string;
    email: string;
    passwd: string;
    token: string;
}

export interface UserState {
    tableHeaders: string[];
    users: User[];
    loading: boolean;
    error: string | null;
}