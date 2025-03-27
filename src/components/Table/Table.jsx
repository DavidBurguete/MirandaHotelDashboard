import * as StyledComponents from "./TableStyledComponents";
import { IoIosArrowDown } from "react-icons/io";

function Table({headers, children}){
    var finalHeaders = null;
    if(headers[0].action === undefined){
        finalHeaders = headers.map(header => {
            return <StyledComponents.TH key={header}>{header}</StyledComponents.TH>;
        });
    }
    else{
        finalHeaders = headers.map(header => {
            return <StyledComponents.TH key={header.head} onClick={header.action} className={header.action !== null ? "as_button" : ""}>{header.head}{header.action !== null ? <IoIosArrowDown style={{marginLeft: "0.5rem"}}/> : ""}</StyledComponents.TH>;
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