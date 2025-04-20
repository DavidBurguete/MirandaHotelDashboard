import styled from "styled-components";

const Load = styled.main`
    padding: 3.125rem;
    font-family: Poppins;
    font-weight: 500;
    font-size: 2rem;
    color: #393939;
`;

function Loading(){
    return <Load>loading...</Load>;
}

export default Loading;