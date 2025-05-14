import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import * as StyledForm from "../../js/FormStyledComponents";
import * as StyledComponents from "../Login/LoginStyledComponents";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { fetchUsers, updateUser } from "../Users/UsersSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { User } from "../../interfaces/UserInterfaces";

function EditAccount(){
    const dispatch = useDispatch<useAppDispatch>();
    const { id } = useParams();
    const users = useAppSelector((state: RootState) => state.users);
    const [ user, setUser ] = useState<User>();
    const [ username, setUsername ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ passwd, setPasswd ] = useState<string>("");
    const [ confirmPasswd, setConfirmPasswd ] = useState<string>("");
    const [ isEmptyUsername, setIsEmptyUsername ] = useState<boolean>(false);
    const [ isNonValidEmail, setIsNonValidEmail ] = useState<boolean>(false);
    const [ isNonValidPasswd, setIsNonValidPasswd ] = useState<boolean>(false);
    const [ isDifferentPasswd, setIsDifferentPasswd ] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(users.loading as boolean){
            dispatch(fetchUsers());
        }
    }, []);

    useEffect(() => {
        if(!users.loading){
            setUser(users.users.find(user => user._id === (id as string)));
        }
    }, [users]);
    
    useEffect(() => {
        if(user !== undefined){
            setUsername(user.user);
            setEmail(user.email);
            setPasswd(user.passwd);
            setConfirmPasswd(user.passwd);
        }
    }, [user]);

    const handleEditAccount = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        setIsEmptyUsername(username === "");
        setIsNonValidEmail(regex.exec(email) === null);
        setIsDifferentPasswd(passwd !== confirmPasswd);
        setIsNonValidPasswd(passwd.length < 5);
        if(username !== "" && regex.exec(email) !== null && passwd === confirmPasswd && passwd.length >= 5){
            dispatch(updateUser({_id: id as string, user: username as string, email: email as string, passwd: passwd as string, token: (user as User).token as string}));
            navigate("/users");
        }
    }

    const handleUsername = (username: React.ChangeEvent) => {
        const HTMLInputElement = username.target as HTMLInputElement;
        setUsername(HTMLInputElement.value);
    }

    const handleEmail = (email: React.ChangeEvent) => {
        const HTMLInputElement = email.target as HTMLInputElement;
        setEmail(HTMLInputElement.value);
    }

    const handlePasswd = (passwd: React.ChangeEvent) => {
        const HTMLInputElement = passwd.target as HTMLInputElement;
        setPasswd(HTMLInputElement.value);
    }

    const handleConfirmPasswd = (passwd: React.ChangeEvent) => {
        const HTMLInputElement = passwd.target as HTMLInputElement;
        setConfirmPasswd(HTMLInputElement.value);
    }

    return <PageWrapper>
        <StyledComponents.FormWrapper>
            {isEmptyUsername && <StyledComponents.Error>The username cannot be empty</StyledComponents.Error>}
            {isNonValidEmail && <StyledComponents.Error>The email has to be a valid format (i.e. user@example.com)</StyledComponents.Error>}
            {isNonValidPasswd && <StyledComponents.Error>The password must contain at least 5 characters</StyledComponents.Error>}
            {isDifferentPasswd && <StyledComponents.Error>The passwords must match</StyledComponents.Error>}
            <StyledForm.Form onSubmit={handleEditAccount}>
                <StyledForm.Label htmlFor="username">
                    User
                    <StyledForm.Input type="text" name="username" id="username" placeholder="Enter your username" onChange={handleUsername} value={username as string}/>
                </StyledForm.Label>
                <StyledForm.Label htmlFor="email">
                    Email
                    <StyledForm.Input type="text" name="email" id="email" placeholder="Enter your email" onChange={handleEmail} value={email as string}/>
                </StyledForm.Label>
                <StyledForm.Label htmlFor="passwd">
                    Password
                    <StyledForm.Input type="password" name="passwd" id="passwd" placeholder="Enter your password" onChange={handlePasswd} value={passwd as string} autoComplete="off"/>
                </StyledForm.Label>
                <StyledForm.Label htmlFor="confirmPasswd">
                    Confirm your password
                    <StyledForm.Input type="password" name="confirmPasswd" id="confirmPasswd" placeholder="Confirm your password" onChange={handleConfirmPasswd} value={confirmPasswd as string} autoComplete="off"/>
                </StyledForm.Label>
                <StyledComponents.FormBottomActionsWrappe>
                    <StyledForm.InputSubmit type="submit" value="Update Account"/>
                </StyledComponents.FormBottomActionsWrappe>
            </StyledForm.Form>
        </StyledComponents.FormWrapper>
    </PageWrapper>;
}

export default EditAccount;