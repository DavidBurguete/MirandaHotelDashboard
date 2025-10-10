import React from "react";
import { useDispatch } from "react-redux";
import PageWrapper from "../../components/PageWrapper";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { deleteUser, fetchUsers } from "./UsersSlice";
import { useEffect } from "react";
import * as StyledComponents from "./UsersStyledComponents";
import { Button, TableActionsWrapper } from "../../js/GlobalStyledComponents";
import Table from "../../components/Table/Table";
import { useAppDispatch, RootState, useAppSelector } from "../../redux/store";
import { User } from "../../interfaces/UserInterfaces";
import { loggedAccountContextInterface } from "../../interfaces/loggedUserInterfaces";
import { useLoggedAccount } from "../Login/LoggedAccountContext";

function Users(){
    const dispatch = useDispatch<useAppDispatch>();
    const navigate = useNavigate();
    const users = useAppSelector((state: RootState) => state.users);
    
    const { loggedAccount } = useLoggedAccount() as loggedAccountContextInterface;
        
    useEffect(() => {
        if(users.loading as boolean){
            dispatch(fetchUsers());
        }
    }, []);
    
    const handleDeleteUser = (event: React.MouseEvent, user_id: string) => {
        event.stopPropagation();
        dispatch(deleteUser(user_id));
    }

    const navigateToUserEdit = (user_id: string) => {
        if(loggedAccount.name as string === "admin"){
            navigate(`/users/${user_id}`);
        }
    }

    return users.loading ?
        <Loading/> : 
        <PageWrapper>
            {loggedAccount.name as string === "admin" && <TableActionsWrapper>
                <NavLink to="/users/new">
                    <Button $background="#135846" $color="white">+ New User</Button>
                </NavLink>
            </TableActionsWrapper>} 
            <Table headers={users.tableHeaders as string[]} action={undefined}>{users.users.map((user: User) => {
                return <StyledComponents.TR key={user._id as string} onClick={() => {navigateToUserEdit(user._id as string)}}>
                    <StyledComponents.TDMoreContent>
                        <p>{user.user as string}</p>
                        <StyledComponents.ID>ID #{user._id as string}</StyledComponents.ID>
                    </StyledComponents.TDMoreContent>
                    <StyledComponents.TD>{user.email as string}</StyledComponents.TD>
                    <StyledComponents.TD>*********</StyledComponents.TD>
                    {loggedAccount.name as string === "admin" && loggedAccount.name as string !== user.user && <td>
                        <StyledComponents.CrossCircled onClick={(event: React.MouseEvent) => {handleDeleteUser(event, user._id as string)}}/>
                    </td>}
                </StyledComponents.TR>;
            })}</Table>
        </PageWrapper>
    ;
}

export default Users;