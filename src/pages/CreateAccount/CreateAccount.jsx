import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import * as StyledForm from "../../js/FormStyledComponents";
import * as StyledComponents from "../Login/LoginStyledComponents";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { createUser } from "../Users/UsersSlice";


function CreateAccount(){
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [ username, setUsername ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ passwd, setPasswd ] = useState("");
    const [ confirmPasswd, setConfirmPasswd ] = useState("");
    const [ isEmptyUsername, setIsEmptyUsername ] = useState(false);
    const [ isNonValidEmail, setIsNonValidEmail ] = useState(false);
    const [ isNonValidPasswd, setIsNonValidPasswd ] = useState(false);
    const [ isDifferentPasswd, setIsDifferentPasswd ] = useState(false);
    const navigate = useNavigate();

    const handleCreateAccount = (e) => {
        e.preventDefault();
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setIsEmptyUsername(username === "");
        setIsNonValidEmail(regex.exec(email) === null);
        setIsDifferentPasswd(passwd !== confirmPasswd);
        setIsNonValidPasswd(passwd.length < 5);
        if(username !== "" && regex.exec(email) !== null && passwd === confirmPasswd && passwd.length >= 5){
            const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
            dispatch(createUser({id: users.users.length + 1, user: username, email: email, passwd: passwd, token: token}));
            navigate("/users");
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

    return <PageWrapper>
        <StyledComponents.FormWrapper>
            {isEmptyUsername && <StyledComponents.Error>The username cannot be empty</StyledComponents.Error>}
            {isNonValidEmail && <StyledComponents.Error>The email has to be a valid format (i.e. user@example.com)</StyledComponents.Error>}
            {isNonValidPasswd && <StyledComponents.Error>The password must contain at least 5 characters</StyledComponents.Error>}
            {isDifferentPasswd && <StyledComponents.Error>The passwords must match</StyledComponents.Error>}
            <StyledForm.Form onSubmit={handleCreateAccount}>
                <StyledForm.Label htmlFor="username">
                    User
                    <StyledForm.Input type="text" name="username" id="username" placeholder="Enter your username" onChange={handleUsername} value={username}/>
                </StyledForm.Label>
                <StyledForm.Label htmlFor="email">
                    Email
                    <StyledForm.Input type="text" name="email" id="email" placeholder="Enter your email" onChange={handleEmail} value={email}/>
                </StyledForm.Label>
                <StyledForm.Label htmlFor="passwd">
                    Password
                    <StyledForm.Input type="password" name="passwd" id="passwd" placeholder="Enter your password" onChange={handlePasswd} value={passwd} autoComplete="off"/>
                </StyledForm.Label>
                <StyledForm.Label htmlFor="confirmPasswd">
                    Confirm your password
                    <StyledForm.Input type="password" name="confirmPasswd" id="confirmPasswd" placeholder="Confirm your password" onChange={handleConfirmPasswd} value={confirmPasswd} autoComplete="off"/>
                </StyledForm.Label>
                <StyledComponents.FormBottomActionsWrappe>
                    <StyledForm.InputSubmit type="submit" value="Create Account"/>
                </StyledComponents.FormBottomActionsWrappe>
            </StyledForm.Form>
        </StyledComponents.FormWrapper>
    </PageWrapper>;
}

export default CreateAccount;