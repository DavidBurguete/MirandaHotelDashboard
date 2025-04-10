import { useEffect, useState } from 'react';
import LateralMenu from '../../components/LateralMenu/LateralMenu';
import Header from '../../components/Header/Header'
import { PageWrapper } from '../../js/GlobalStyledComponents';
import { Outlet, useNavigate } from 'react-router-dom';

function GlobalLayout({loggedAccount, loggedAccountDispatch}){
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();

    const Toggler = () => {
        setToggle(!toggle);
    }

    useEffect(() => {
        if (loggedAccount.logged) {
            localStorage.setItem("token", loggedAccount.token);
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