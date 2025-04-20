import React, { useEffect, useState } from "react";
import * as StyledForm from "../../js/FormStyledComponents";
import * as StyledComponents from "./LoginStyledComponents";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { actionLoggedInterface, logedUserInterface } from "../../interfaces/loggedUserInterfaces";


function Login({loggedAccount, loggedAccountDispatch}: {loggedAccount: logedUserInterface, loggedAccountDispatch: React.ActionDispatch<[action: actionLoggedInterface]>}){
    const [ username, setUsername ] = useState("");
    const [ passwd, setPasswd ] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            loggedAccountDispatch({type: "login/loginWithToken", token: localStorage.getItem("token") as string} as actionLoggedInterface);
        }
    }, []);

    useEffect(() => {
        if(loggedAccount.logged){
            navigate("/dashboard");
        }
    }, [loggedAccount]);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loggedAccountDispatch({type: "login/login", user: username, passwd: passwd} as actionLoggedInterface);
    }

    const handleUsername = (username: React.ChangeEvent) => {
        const HTMLInputElement = username.target as HTMLInputElement;
        setUsername(HTMLInputElement.value);
    }

    const handlePasswd = (passwd: React.ChangeEvent) => {
        const HTMLInputElement = passwd.target as HTMLInputElement;
        setPasswd(HTMLInputElement.value);
    }

    return <PageWrapper>
        <StyledComponents.FormWrapper>
            <StyledComponents.LogoImg src="/img/hotel.svg" alt="hotel logo" />
            {loggedAccount.error !== null && <StyledComponents.Error data-cy="errorMessage">{loggedAccount.error}</StyledComponents.Error>}
            <StyledForm.Form onSubmit={handleLogin}>
                <StyledForm.Label htmlFor="username">
                    User
                    <StyledForm.Input data-cy="username" type="text" name="username" id="username" placeholder="Enter your username" onChange={handleUsername} value={username as string}/>
                </StyledForm.Label>
                <StyledForm.Label htmlFor="passwd">
                    Password
                    <StyledForm.Input data-cy="passwd" type="password" name="passwd" id="passwd" placeholder="Enter your password" onChange={handlePasswd} value={passwd as string} autoComplete="off"/>
                </StyledForm.Label>
                <StyledForm.InputSubmit data-cy="loginButton" type="submit" value="Login"/>
            </StyledForm.Form>
        </StyledComponents.FormWrapper>
    </PageWrapper>;
}

export default Login;