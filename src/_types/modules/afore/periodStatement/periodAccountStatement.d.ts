import { ParentComponentPropsI } from "lib-components-react/lib/@types/components/parentComponent";
export interface PeriodAccountStatementModulePropsI {
    periodAccountStatementTransactions: any,
    periodQuarterResumes: PeriodResumesPropsI,
    periodAllResumes: PeriodResumesPropsI
}

export interface PeriodResumesPropsI {
    periodResumeAllSections: PeriodResumePropsI,
    periodResumeVoluntarySave: PeriodResumePropsI,
    periodResumeRetiredSave: PeriodResumePropsI,
    periodResumeInfonavitSave: PeriodResumePropsI
}

export interface PeriodResumePropsI {
    yield: number
    deposits: number
    interests: number
    withdraws: number
    commissions: number
}