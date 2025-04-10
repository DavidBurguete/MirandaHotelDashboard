import styled from "styled-components";

const PageWrapperSC = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    padding: 3.125rem;
    background-color: #F8F8F8;
`;

function PageWrapper({children}){
    return <PageWrapperSC>
        {children}
    </PageWrapperSC>
}

export default PageWrapper;