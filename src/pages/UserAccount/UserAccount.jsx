import { useState } from "react";
import * as StyledForm from "../../js/FormStyledComponents";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "../Login/LoginStyledComponents";
import { updateAccount, deleteAccount } from "../Login/accountSlice";
import { Button } from "../../js/GlobalStyledComponents";
import styled from "styled-components";

const DeleteAccount = styled(Button)`
    align-self: flex-end;
    margin-block: 0;
    margin-right: 1rem;
    padding: 1rem;
    max-width: 15rem;
    width: 15rem;
    border: 2px solid #E23428;
    font-weight: 600;
    font-size: 1rem;
`;

const ConfirmDeleteAccountWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: flex-end;
    margin: 1rem;
`;

const ConfirmDeleteAccount = styled(Button)`
    margin-right: 1rem;
    width: 100%;
    border: 2px solid #0EAC00;
    font-weight: 1000;
    font-size: 1rem;
`;

const RevertDeleteAccount = styled(Button)`
    width: 100%;
    border: 2px solid #E23428;
    font-weight: 500;
    font-size: 1rem;
`;

function UserAccount(){
    const account = useSelector(state => state.account);
    const [ username, setUsername ] = useState(account.name);
    const [ email, setEmail ] = useState(account.email);
    const [ passwd, setPasswd ] = useState(account.passwd);
    const [ confirmPasswd, setConfirmPasswd ] = useState(account.passwd);
    const [ isEmptyUsername, setIsEmptyUsername ] = useState(false);
    const [ isNonValidEmail, setIsNonValidEmail ] = useState(false);
    const [ isNonValidPasswd, setIsNonValidPasswd ] = useState(false);
    const [ isDifferentPasswd, setIsDifferentPasswd ] = useState(false);
    const [ isConfirmDelete, setIsConfirmDelete ] = useState(false);
    const dispatch = useDispatch();
    
    const handleUpdateAccount = (e) => {
        e.preventDefault();
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setIsEmptyUsername(username === "");
        setIsNonValidEmail(regex.exec(email) === null);
        setIsDifferentPasswd(passwd !== confirmPasswd);
        setIsNonValidPasswd(passwd.length < 5);
        if(username !== "" && regex.exec(email) !== null && passwd === confirmPasswd && passwd.length >= 5){
            dispatch(updateAccount({user: username, email: email, passwd: passwd, token: account.token}));
        }
    }
    const preventEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
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

    const handleDeleteAccount = () => {
        setIsConfirmDelete(!isConfirmDelete);
    }

    const handleConfirmDelete = () => {
        dispatch(deleteAccount(account.token));
        localStorage.removeItem("token");
    }

    return <main>
        {isEmptyUsername && <Error>The username cannot be empty</Error>}
        {isNonValidEmail && <Error>The email has to be a valid format (i.e. user@example.com)</Error>}
        {isNonValidPasswd && <Error>The password must contain at least 5 characters</Error>}
        {isDifferentPasswd && <Error>The passwords must match</Error>}
        <StyledForm.Form onSubmit={handleUpdateAccount} onKeyDown={preventEnter}>
            <StyledForm.Label htmlFor="username">
                Your username
                <StyledForm.Input type="text" name="username" id="username" placeholder="Enter your new username" onChange={handleUsername} value={username}/>
            </StyledForm.Label>
            <StyledForm.Label htmlFor="email">
                Your email
                <StyledForm.Input type="text" name="email" id="email" placeholder="Enter your new email" onChange={handleEmail} value={email}/>
            </StyledForm.Label>
            <StyledForm.Label htmlFor="passwd">
                Your password
                <StyledForm.Input type="password" name="passwd" id="passwd" placeholder="Enter your new password" onChange={handlePasswd} value={passwd} autoComplete="off"/>
            </StyledForm.Label>
            <StyledForm.Label htmlFor="confirmPasswd">
                Confirm your password
                <StyledForm.Input type="password" name="confirmPasswd" id="confirmPasswd" placeholder="Confirm your password" onChange={handleConfirmPasswd} value={confirmPasswd} autoComplete="off"/>
            </StyledForm.Label>
            <StyledForm.InputSubmit type="submit" value="Update Account"/>
            <DeleteAccount $background="#300000" $color="#E23428" onClick={handleDeleteAccount}>{isConfirmDelete ? "Are you sure?" : "Delete Account"}</DeleteAccount>
            {isConfirmDelete && <ConfirmDeleteAccountWrapper>
                    <ConfirmDeleteAccount $background="#003000" $color="#0EAC00" onClick={handleConfirmDelete}>Yes</ConfirmDeleteAccount>
                    <RevertDeleteAccount $background="#300000" $color="#E23428" onClick={handleDeleteAccount}>No</RevertDeleteAccount>
                </ConfirmDeleteAccountWrapper>}
        </StyledForm.Form>
    </main>;
}

export default UserAccount;