import React, { createContext, useReducer, ReactNode, useContext } from 'react';
import { actionLoggedInterface, logedUserInterface, loggedAccountContextInterface } from '../../interfaces/loggedUserInterfaces';

const initialState = {
    logged: false,
    name: null,
    email: null,
    token: null,
    error: null
} as logedUserInterface;

const loginReducer = (state: logedUserInterface, action: actionLoggedInterface) => {
    switch (action.type) {
        case "login/login":
            return {
                logged: true,
                name: action.user,
                email: action.email,
                token: action.token,
                error: null
            };
        case "login/loginFailed":
            return {
                logged: false,
                name: null,
                email: null,
                token: null,
                error: action.error.message
            };
        case "login/loginWithToken":
            return action.token ? {
                logged: true,
                name: action.user,
                email: action.email,
                token: action.token,
                error: null
            } : {
                logged: false,
                name: null,
                email: null,
                token: null,
                error: "There was an error on login after refresh"
            };
        case "login/logout":
            return {
                logged: false,
                name: null,
                email: null,
                token: null,
                error: null
            };
        default:
            return state;
    }
};

const LoggedAccountContext = createContext<loggedAccountContextInterface | undefined>(undefined);

export const LoggedAccountProvider = ({ children }: { children: ReactNode }) => {
    const [loggedAccount, loggedAccountDispatch] = useReducer(loginReducer, initialState);

    return (
        <LoggedAccountContext.Provider value={{ loggedAccount, loggedAccountDispatch }}>
            {children}
        </LoggedAccountContext.Provider>
    );
};

export const useLoggedAccount = () => { return useContext(LoggedAccountContext) };
