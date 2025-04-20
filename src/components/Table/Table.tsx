import { useDispatch } from "react-redux";
import * as StyledComponents from "./TableStyledComponents";
import { IoIosArrowDown } from "react-icons/io";
import { ReactNode } from "react";
import { BookingTableHeaders } from "../../interfaces/BookingInterfaces";
import { AsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../redux/store";

function Table({headers, action, children}: {headers: string[] | BookingTableHeaders[], action: AsyncThunk<any, string, any> | undefined, children: ReactNode}){
    const dispatch = useDispatch<useAppDispatch>();

    const handleAction = (actionName: string | null, action: AsyncThunk<any, string, any>) => {
        if(actionName !== null){
            dispatch(action(actionName));
        }
    }

    let finalHeaders = [] as React.JSX.Element[];
    if(action === undefined){
        finalHeaders = (headers as string[]).map((header: string) => {
            return <StyledComponents.TH key={header}>{header}</StyledComponents.TH>;
        });
    }
    else{
        finalHeaders = (headers as BookingTableHeaders[]).map((header: BookingTableHeaders) => {
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