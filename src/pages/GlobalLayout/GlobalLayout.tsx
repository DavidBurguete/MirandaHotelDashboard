import { useEffect, useState } from 'react';
import LateralMenu from '../../components/LateralMenu/LateralMenu';
import Header from '../../components/Header/Header'
import { PageWrapper } from '../../js/GlobalStyledComponents';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLoggedAccount } from '../Login/LoggedAccountContext';
import { loggedAccountContextInterface } from '../../interfaces/loggedUserInterfaces';

function GlobalLayout(){
    const [toggle, setToggle] = useState<boolean>(true);
    const navigate = useNavigate();
    
    const { loggedAccount, loggedAccountDispatch } = useLoggedAccount() as loggedAccountContextInterface;

    const Toggler = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        if (loggedAccount.logged) {
            localStorage.setItem("token", loggedAccount.token as string);
        }
        else{
            navigate("/login");
        }
    }, [loggedAccount]);

    return <>
        <LateralMenu isToggled={toggle} loggedAccount={loggedAccount} />
        <PageWrapper $toggleForWidth={toggle}>
            <Header Toggler={Toggler} loggedAccountDispatch={loggedAccountDispatch} />
            <Outlet/>
        </PageWrapper> 
    </>;
}

export default GlobalLayout;