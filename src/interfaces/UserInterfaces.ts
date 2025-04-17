export interface User {
    id: number;
    user: string;
    email: string;
    password: string;
}

export interface UserState {
    tableHeaders: string[];
    users: User[];
    loading: boolean;
    error: string | null;
}