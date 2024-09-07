import React from "react";
import { AccountStatementModulePropsI } from "@app/_types/modules/statement/accountStatement";
import DataTableComponent from 'lib-components-react/lib/components/dataTable/dataTableComponent';
import { columnsAccountStatementTransactionList } from "./accountStatementModuleConfig";

const AccountStatementModuleComponent: React.FC<AccountStatementModulePropsI> = (props) => {

    return (<div>
        <div style={{padding: "3px"}}>
            <div>
                <div style={{float: "left", width: "25%"}}><b>Previous Balance: {props.previousBalance}</b></div>
                <div style={{float: "left", width: "20%"}}><b>Current Balance: {props.currentBalance}</b></div>
            </div>
            <div style={{clear: "both", paddingTop: "2px"}}>
                <div style={{float: "left", width: "25%"}}><b>Year: {props.year}</b></div>
                <div style={{float: "left", width: "25%"}}><b>Month: {props.month}</b></div>
                <div style={{float: "left", width: "25%"}}><b>Day cut: {props.dayCut == -1 ? "Last day of month" : props.dayCut}</b></div>
                <div style={{float: "left", width: "25%"}}><b>BrokerAccount: {props.brokerAccount}</b></div>
            </div>
        </div>
        <div style={{clear: "both"}}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DataTableComponent
                        title="Issues"
                        tableWidth="100%"
                        isShowRowsPage = {false}
                        columnDefList={columnsAccountStatementTransactionList}
                        columnDataList={props.accountStatementTransactions}
                        totalRows={props.accountStatementTransactions.length} />
            </div>
        </div>
        <br></br>
    </div>)
}

export default AccountStatementModuleComponent