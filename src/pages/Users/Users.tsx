import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../../components/PageWrapper";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { deleteUser, fetchUsers } from "./UsersSlice";
import { useEffect } from "react";
import * as StyledComponents from "./UsersStyledComponents";
import { Button, TableActionsWrapper } from "../../js/GlobalStyledComponents";
import Table from "../../components/Table/Table";
import { AppDispatch, RootState } from "../../redux/store";

function Users({loggedAccount}){
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const users = useSelector((state: RootState) => state.users);
        
    useEffect(() => {
        if(users.loading){
            dispatch(fetchUsers());
        }
    }, []);
    
    const handleDeleteUser = (event: React.MouseEvent, user_id: number) => {
        event.stopPropagation();
        dispatch(deleteUser(user_id));
    }

    const navigateToUserEdit = (user_id: number) => {
        if(loggedAccount.token === "rtbu56BTSrww4TuKBEc1wevBN5"){
            navigate(`/users/${user_id}`);
        }
    }

    return users.loading ?
        <Loading/> : 
        <PageWrapper>
            {loggedAccount.token === "rtbu56BTSrww4TuKBEc1wevBN5" && <TableActionsWrapper>
                <NavLink to="/users/new">
                    <Button $background="#135846" $color="white">+ New User</Button>
                </NavLink>
            </TableActionsWrapper>} 
            <Table headers={users.tableHeaders} action={undefined}>{users.users.map(user => {
                return <StyledComponents.TR key={user.id} onClick={() => {navigateToUserEdit(user.id)}}>
                    <StyledComponents.TDMoreContent>
                        <p>{user.user}</p>
                        <StyledComponents.ID>ID #{user.id}</StyledComponents.ID>
                    </StyledComponents.TDMoreContent>
                    <StyledComponents.TD>{user.email}</StyledComponents.TD>
                    <StyledComponents.TD>*********</StyledComponents.TD>
                    {loggedAccount.token === "rtbu56BTSrww4TuKBEc1wevBN5" && <td>
                        <StyledComponents.CrossCircled onClick={(event) => {handleDeleteUser(event, user.id)}}/>
                    </td>}
                </StyledComponents.TR>;
            })}</Table>
        </PageWrapper>
    ;
}

export default Users;