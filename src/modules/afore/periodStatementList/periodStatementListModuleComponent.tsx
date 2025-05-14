import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { setTemplateHeaderSubTitleAction } from "lib-components-react/lib/controller/actions/templateHeaderAction";
import { debug, generateDebugClassModule } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from "lib-components-react/lib/controller/actions/templateLoadingAction";
import { manageAlertModuleError } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { getSafeLocation } from "lib-components-react/lib/utils/webUtils/routeUtil";
import { getAforePeriodResumeStatementService, getAforePeriodsResumeStatementService } from "@app/controller/services/aforeStatementService";
import { maskData } from "lib-components-react/lib/utils/dataUtils/maskDataUtil";
import { MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import { PeriodAccountStatementListModulePropsI } from "@app/_types/modules/afore/periodStatement/periodAccountStatementList";
import PeriodAccountStatementModuleComponent from "../periodAccountStatement/periodAccountStatementModuleComponent";
import { maskAmount, maskDate, maskYield } from "@app/utils/maskDefaultUtil";

const PeriodStatementListModuleComponent: React.FC<PeriodAccountStatementListModulePropsI> = (props) => {

    const dispatch = useDispatch();
    
    const [statementPeriodsList, setStatementPeriodsList] = React.useState<any>([]);
    const [accountStatementList, setAccountStatementList] = React.useState<any>([]);
    const [periodsAccordion, setPeriodsAccordion] = React.useState<any>({});

    useEffect(() => {

        dispatch(setTemplateHeaderSubTitleAction("Afore period statement list"));
        initGetAforePeriodsResumeStatement();
        return () => {
        };
    }, []);

    

    const generateHeaderTab = (periodResume: any) => {

        return <div style={{ display: "flex", fontFamily: "var(--cui-body-font-family)", fontSize: "12px", fontWeight: "bold" }}>
            <div  style={{ width: "170px", display: "flex", justifyContent: "start", alignItems: "center" }}>
                <div>{maskDate(periodResume.startDate)}</div>
                <div>&nbsp;{"-"}&nbsp;</div>
                <div>{maskDate(periodResume.endDate)}</div>
            </div>
            <div style={{ width: "140px" }}>{"Total: " + maskAmount(periodResume.amountCumulative)}</div>
            <div style={{ width: "200px" }}>{" Amount Period: " + maskAmount(periodResume.amountPeriod)}</div>
            <div>Period annualized yield: {maskYield(periodResume.yieldAnualPeriod)}</div>
        </div>;
    }

    const initPeriodGetAccountStatement = (datePeriod: any) => {

        let debugClass = generateDebugClassModule("init period account statement module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading period account statement module"));
        axios.all([getAforePeriodResumeStatementService(datePeriod)])
            .then(axios.spread((periodAccountStatementData) => {

                debug(debugClass, "result", periodAccountStatementData);
                let periodAccountListBlock: any = { ...accountStatementList};
                periodAccountListBlock[datePeriod] = periodAccountStatementData.data;
                setAccountStatementList(periodAccountListBlock);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const initGetAforePeriodsResumeStatement = () => {

        let debugClass = generateDebugClassModule("init afore periods statement module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading afore periods statement module"));
        axios.all([getAforePeriodsResumeStatementService()])
            .then(axios.spread((periodsResumeStatementData) => {

                debug(debugClass, "result", periodsResumeStatementData);
                setStatementPeriodsList(periodsResumeStatementData.data.periods);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const initPeriodTabChange = (eventTab: any, periodDate: any) => {

        let key = periodDate;

        let periodsAccordionBlock = {...periodsAccordion};
        periodsAccordionBlock[key] = eventTab.index;
        setPeriodsAccordion(periodsAccordionBlock);

        if(accountStatementList[key] === undefined)
            initPeriodGetAccountStatement(periodDate);
    }

    const generatePeriodAccountStatement = (periodDate: any) => {

        let element = periodDate;
        let accountStatementData = accountStatementList[element];

        if (accountStatementData !== undefined && accountStatementData !== null)
            return <PeriodAccountStatementModuleComponent 
                periodAccountStatementTransactions={accountStatementData.periodTransactions}
                periodQuarterResumes={accountStatementData.periodQuarterResumes}
                periodAllResumes={accountStatementData.periodAllResumes}
            />
        else
            return <p>No data for statement</p>;
    }

    const generatePeriods = () => {

        let accordionPeriods: any = [];

        statementPeriodsList.forEach((period: any) => {
            let accordion = <Accordion key={period.endDate} activeIndex={periodsAccordion[period.endDate]} onTabChange={(e) => initPeriodTabChange(e, period.endDate) }>
                    <AccordionTab header={generateHeaderTab(period)} key={period.endDate}>
                        <div className={"customBootstrapRow"}>
                            { generatePeriodAccountStatement(period.endDate) }
                        </div>
                    </AccordionTab>
                </Accordion>

            accordionPeriods.push(accordion);
        });

        return accordionPeriods;
    }

    return (<div>{generatePeriods()}</div>);
}

export default PeriodStatementListModuleComponent