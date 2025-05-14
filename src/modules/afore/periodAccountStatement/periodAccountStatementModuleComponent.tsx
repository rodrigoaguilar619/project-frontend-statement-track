import React from "react";
import DataTableComponent from 'lib-components-react/lib/components/dataTable/dataTableComponent';
import { columnsPeriodAccountStatementTransactionList } from "./periodAccountStatementModuleConfig";
import { PeriodAccountStatementModulePropsI } from "@app/_types/modules/afore/periodStatement/periodAccountStatement";
import { maskAmount, maskYield } from "@app/utils/maskDefaultUtil";

const PeriodAccountStatementModuleComponent: React.FC<PeriodAccountStatementModulePropsI> = (props) => {

    const headers = { section: "Section", yield: "Yield", deposits: "Deposits", withdraws: "Withdraws",
        commissions: "Commissions", interests: "Interests" };

    const buildResumeRowTable = (data: any, isBold: boolean) => {
    
        const style = isBold ? { fontWeight: "bold" } : {};

        return (<div className="row">
            <div className="cell" style={{width: "150px", ...style}}>{data.section}</div>
            <div className="cell" style={{width: "80px", ...style}}>{typeof data.yield === "number" ? maskYield(data.yield) : data.yield}</div>
            <div className="cell" style={{width: "80px", ...style}}>{typeof data.deposits === "number" ? maskAmount(data.deposits) : data.deposits}</div>
            <div className="cell" style={{width: "100px", ...style}}>{typeof data.withdraws === "number" ? maskAmount(data.withdraws) : data.withdraws}</div>
            <div className="cell" style={{width: "100px", ...style}}>{typeof data.commissions === "number" ? maskAmount(data.commissions) : data.commissions}</div>
            <div className="cell" style={{width: "90px", ...style}}>{typeof data.interests === "number" ? maskAmount(data.interests) : data.interests}</div>
        </div>);
    }

    const buildTable = (periodResume: any) => {
        return <div className="table">
            {buildResumeRowTable(headers, true)}
            {buildResumeRowTable({ section: "All sections", ...periodResume.periodResumeAllSections}, false)}
            {buildResumeRowTable({ section: "Voluntary Savings", ...periodResume.periodResumeVoluntarySave}, false)}
            {buildResumeRowTable({ section: "Retirement Savings", ...periodResume.periodResumeRetiredSave}, false)}
            {buildResumeRowTable({ section: "Infonavit Savings", ...periodResume.periodResumeInfonavitSave}, false)}
        </div>
    }

    return (<div>
        <div style={{display: "flex", width: "100%", paddingLeft: "10px", paddingRight: "20px"}}>
            <div>
                <div style={{ fontWeight: "bold", textAlign: "center" }}>QUARTER PERIOD</div>
                {buildTable(props.periodQuarterResumes)}
            </div>
            <div style={{ marginLeft: "auto" }}>
                <div style={{ fontWeight: "bold", textAlign: "center" }}>ALL PERIODS</div>
                {buildTable(props.periodAllResumes)}
            </div>
        </div>
        <div style={{clear: "both"}}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <DataTableComponent
                        title="Issues"
                        tableWidth="100%"
                        isShowRowsPage = {false}
                        columnDefList={columnsPeriodAccountStatementTransactionList}
                        columnDataList={props.periodAccountStatementTransactions}
                        totalRows={props.periodAccountStatementTransactions.length} />
            </div>
        </div>
        <br></br>
    </div>)
}

export default PeriodAccountStatementModuleComponent