import { useDispatch } from "react-redux";
import * as StyledComponents from "./TableStyledComponents";
import { IoIosArrowDown } from "react-icons/io";

function Table({headers, action, children}){
    const dispatch = useDispatch();

    const handleAction = (actionName, action) => {
        if(actionName !== null){
            dispatch(action(actionName));
        }
    }

    let finalHeaders = null;
    if(action === undefined){
        finalHeaders = headers.map(header => {
            return <StyledComponents.TH key={header}>{header}</StyledComponents.TH>;
        });
    }
    else{
        finalHeaders = headers.map(header => {
            return <StyledComponents.THSort key={header.head} onClick={() => handleAction(header.action, action)} $as_button={header.action !== null}>{header.head}{header.action !== null ? <IoIosArrowDown style={{marginLeft: "0.5rem"}}/> : ""}</StyledComponents.THSort>;
        });
    }
    return <StyledComponents.TableTag id="list">
        <StyledComponents.THead>
            <StyledComponents.TR>
                {finalHeaders}
            </StyledComponents.TR>
        </StyledComponents.THead>
        <StyledComponents.TBody>
            {children}
        </StyledComponents.TBody>
    </StyledComponents.TableTag>
}

export default Table;