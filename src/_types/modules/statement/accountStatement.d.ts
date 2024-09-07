import { ParentComponentPropsI } from "lib-components-react/lib/@types/components/parentComponent";
export interface AccountStatementModulePropsI {

    previousBalance: number
    currentBalance: number
    year: number
    month: string
    dayCut: number
    brokerAccount: string
    accountStatementTransactions: any
    
}