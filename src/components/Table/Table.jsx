import * as StyledComponents from "./TableStyledComponents";

function Table({headers, children}){
    return <StyledComponents.TableTag id="list">
        <StyledComponents.THead>
            <StyledComponents.TR>
                {headers.map(header => {
                    return <StyledComponents.TH key={header}>{header}</StyledComponents.TH>;
                })}
            </StyledComponents.TR>
        </StyledComponents.THead>
        <StyledComponents.TBody>
            {children}
        </StyledComponents.TBody>
    </StyledComponents.TableTag>
}

export default Table;