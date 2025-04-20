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
import { logedUserInterface } from "../../interfaces/loggedUserInterfaces";

function Users({loggedAccount}: {loggedAccount: logedUserInterface}){
    const dispatch = useDispatch<useAppDispatch>();
    const navigate = useNavigate();
    const users = useAppSelector((state: RootState) => state.users);
        
    useEffect(() => {
        if(users.loading as boolean){
            dispatch(fetchUsers());
        }
    }, []);
    
    const handleDeleteUser = (event: React.MouseEvent, user_id: number) => {
        event.stopPropagation();
        dispatch(deleteUser(user_id));
    }

    const navigateToUserEdit = (user_id: number) => {
        if(loggedAccount.token as string === "rtbu56BTSrww4TuKBEc1wevBN5"){
            navigate(`/users/${user_id}`);
        }
    }

    return users.loading ?
        <Loading/> : 
        <PageWrapper>
            {loggedAccount.token as string === "rtbu56BTSrww4TuKBEc1wevBN5" && <TableActionsWrapper>
                <NavLink to="/users/new">
                    <Button $background="#135846" $color="white">+ New User</Button>
                </NavLink>
            </TableActionsWrapper>} 
            <Table headers={users.tableHeaders as string[]} action={undefined}>{users.users.map((user: User) => {
                return <StyledComponents.TR key={user.id as number} onClick={() => {navigateToUserEdit(user.id as number)}}>
                    <StyledComponents.TDMoreContent>
                        <p>{user.user as string}</p>
                        <StyledComponents.ID>ID #{user.id as number}</StyledComponents.ID>
                    </StyledComponents.TDMoreContent>
                    <StyledComponents.TD>{user.email as string}</StyledComponents.TD>
                    <StyledComponents.TD>*********</StyledComponents.TD>
                    {loggedAccount.token as string === "rtbu56BTSrww4TuKBEc1wevBN5" && <td>
                        <StyledComponents.CrossCircled onClick={(event: React.MouseEvent) => {handleDeleteUser(event, user.id as number)}}/>
                    </td>}
                </StyledComponents.TR>;
            })}</Table>
        </PageWrapper>
    ;
}

export default Users;