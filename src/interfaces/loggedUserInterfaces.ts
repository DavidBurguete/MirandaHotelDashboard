export interface userDataInterface {
    user: string,
    email: string,
    passwd: string,
    token: string
}

export interface logedUserInterface {
    logged: boolean,
    name: string | null,
    email: string | null,
    token: string | null,
    error: string | null
}

export interface actionLoggedInterface {
    type: string;
    user: string;
    passwd: string;
    token: string;
}