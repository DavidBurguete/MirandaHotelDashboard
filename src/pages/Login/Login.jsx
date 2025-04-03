import { useDispatch, useSelector } from "react-redux";
import { login, loginWithToken, createAccount } from "./accountSlice";
import { useEffect, useState } from "react";
import * as StyledForm from "../../js/FormStyledComponents";
import * as StyledComponents from "./LoginStyledComponents";
import { useNavigate } from "react-router-dom";


function Login(){
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ passwd, setPasswd ] = useState("");
    const [ confirmPasswd, setConfirmPasswd ] = useState("");
    const [ isCreateAccount, setIsCreateAccount ] = useState(false);
    const [ isEmptyUsername, setIsEmptyUsername ] = useState(false);
    const [ isNonValidEmail, setIsNonValidEmail ] = useState(false);
    const [ isNonValidPasswd, setIsNonValidPasswd ] = useState(false);
    const [ isDifferentPasswd, setIsDifferentPasswd ] = useState(false);
    const account = useSelector(state => state.account);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token") !== null){
            dispatch(loginWithToken(localStorage.getItem("token")));
            navigate("/");
        }
        else{
            navigate('/login', { replace: false });
        }
    }, []);


    const handleLogin = (e) => {
        e.preventDefault();
        if(!isCreateAccount){
            dispatch(login({user: username, passwd: passwd}));
            navigate("/");
        }
        else{
            const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            setIsEmptyUsername(username === "");
            setIsNonValidEmail(regex.exec(email) === null);
            setIsDifferentPasswd(passwd !== confirmPasswd);
            setIsNonValidPasswd(passwd.length < 5);
            if(username !== "" && regex.exec(email) !== null && passwd === confirmPasswd && passwd.length >= 5){
                const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
                dispatch(createAccount({user: username, email: email, passwd: passwd, token: token}));
                navigate("/");
            }
        }
    }

    const handleUsername = (username) => {
        setUsername(username.target.value);
    }

    const handleEmail = (email) => {
        setEmail(email.target.value);
    }

    const handlePasswd = (passwd) => {
        setPasswd(passwd.target.value);
    }

    const handleConfirmPasswd = (passwd) => {
        setConfirmPasswd(passwd.target.value);
    }

    return <main>
        <StyledComponents.FormWrapper>
            <StyledComponents.LogoImg src="/img/hotel.svg" alt="hotel logo" />
            {account.error !== null && !isCreateAccount && <StyledComponents.Error>{account.error}</StyledComponents.Error>}
            {isEmptyUsername && <StyledComponents.Error>The username cannot be empty</StyledComponents.Error>}
            {isNonValidEmail && <StyledComponents.Error>The email has to be a valid format (i.e. user@example.com)</StyledComponents.Error>}
            {isNonValidPasswd && <StyledComponents.Error>The password must contain at least 5 characters</StyledComponents.Error>}
            {isDifferentPasswd && <StyledComponents.Error>The passwords must match</StyledComponents.Error>}
            <StyledForm.Form onSubmit={handleLogin}>
                <StyledForm.Label htmlFor="username">
                    User {!isCreateAccount && "or Email"}
                    <StyledForm.Input type="text" name="username" id="username" placeholder={"Enter your username" + (!isCreateAccount ? " or e-mail" : "")} onChange={handleUsername} value={username}/>
                </StyledForm.Label>
                {isCreateAccount && <StyledForm.Label htmlFor="email">
                    Email
                    <StyledForm.Input type="text" name="email" id="email" placeholder="Enter your email" onChange={handleEmail} value={email}/>
                </StyledForm.Label>}
                <StyledForm.Label htmlFor="passwd">
                    Password
                    <StyledForm.Input type="password" name="passwd" id="passwd" placeholder="Enter your password" onChange={handlePasswd} value={passwd} autoComplete="off"/>
                </StyledForm.Label>
                {isCreateAccount && <StyledForm.Label htmlFor="confirmPasswd">
                    Confirm your password
                    <StyledForm.Input type="password" name="confirmPasswd" id="confirmPasswd" placeholder="Confirm your password" onChange={handleConfirmPasswd} value={confirmPasswd} autoComplete="off"/>
                </StyledForm.Label>}
                <StyledComponents.FormBottomActionsWrappe>
                    <StyledComponents.CreateAccountToggler onClick={() => setIsCreateAccount(!isCreateAccount)}>{isCreateAccount ? "Do you have an account? Login" : "You don't have an account? Create account"}</StyledComponents.CreateAccountToggler>
                    <StyledForm.InputSubmit type="submit" value={isCreateAccount ? "Create Account" : "Login"}/>
                </StyledComponents.FormBottomActionsWrappe>
            </StyledForm.Form>
        </StyledComponents.FormWrapper>
    </main>;
}

export default Login;