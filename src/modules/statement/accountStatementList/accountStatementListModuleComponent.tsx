import React, { useEffect } from "react";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { getParameterCall } from "lib-components-react/lib/utils/componentUtils/formUtil";
import { AccountStatementListModulePropsI } from "@app/_types/modules/statement/accountStatementList";
import { useDispatch } from "react-redux";
import { setTemplateHeaderSubTitleAction } from "lib-components-react/lib/controller/actions/templateHeaderAction";
import { debug, generateDebugClassModule } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from "lib-components-react/lib/controller/actions/templateLoadingAction";
import axios from "axios";
import { getAccountStatementService, getDateStatementsService } from "@app/controller/services/accountStatementService";
import { manageAlertModuleError } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import AccountStatementModuleComponent from "../accountStatement/accountStatementModuleComponent";
import { useLocation } from "react-router-dom";
import { getMonthName } from "@app/utils/statementDateUtil";

const AccountStatementListModuleComponent: React.FC<AccountStatementListModulePropsI> = (props) => {

    const dispatch = useDispatch();
    let location = useLocation();
    
    const idBrokerAccount = getParameterCall(location, props, "idBrokerAccount");
    const [statementDatesList, setStatementDatesList] = React.useState<any>([]);
    const [accountStatementList, setAccountStatementList] = React.useState<any>([]);
    const [monthsAccordion, setMonthsAccordion] = React.useState<any>({});
    const [yearsAccordion, setYearsAccordion] = React.useState<any>({});

    useEffect(() => {

        dispatch(setTemplateHeaderSubTitleAction("Account statement list"));
        initGetDateStatements(idBrokerAccount);
        return () => {
        };
    }, []);

    const initGetAccountStatement = (idBrokerAccount: number, year: number, month: number) => {

        let debugClass = generateDebugClassModule("init account statement module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading account statement module"));
        axios.all([getAccountStatementService(idBrokerAccount, year, month)])
            .then(axios.spread((accountStatementData) => {

                debug(debugClass, "result", accountStatementData);
                let brokerAccountListBlock: any = { ...accountStatementList};
                brokerAccountListBlock[year + "_" + month] = accountStatementData.data;
                setAccountStatementList(brokerAccountListBlock);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const initGetDateStatements = (idBrokerAccount: number) => {

        let debugClass = generateDebugClassModule("init date statements module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading date statements module"));
        axios.all([getDateStatementsService(idBrokerAccount)])
            .then(axios.spread((dateStatementsData) => {

                debug(debugClass, "result", dateStatementsData);
                setStatementDatesList(dateStatementsData.data.years);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const initMonthTabChange = (eventTab: any, idBrokerAccount: number, year: number, idMonth: number) => {

        let key = year + "_" + idMonth;

        let monthsAccordionBlock = {...monthsAccordion};
        monthsAccordionBlock[key] = eventTab.index;
        setMonthsAccordion(monthsAccordionBlock);

        if(accountStatementList[key] === undefined)
            initGetAccountStatement(idBrokerAccount, year, idMonth);
    }

    const generateAccountStatement = (year: number, idMonth: number) => {

        let element = year + "_" + idMonth;
        let accountStatementData = accountStatementList[element];

        if (accountStatementData !== undefined && accountStatementData !== null)
            return <AccountStatementModuleComponent 
                accountStatementTransactions={accountStatementData.operationsStatement}
                previousBalance={accountStatementData.previousBalance}
                currentBalance={accountStatementData.currentBalance} 
                dayCut={accountStatementData.brokerAccountResume.cutDay}
                brokerAccount={accountStatementData.brokerAccountResume.accountDescription}
                month={getMonthName(accountStatementData.month)}
                year={accountStatementData.year}
            />
        else
            return <p>No data for statement</p>;
    }

    const generateMonths = (year: number, months: any) => {
        
        let accordionMonths: any = [];

        months.forEach((month: any) => {

            let key = year + "_" + month.id;
            
            let accordion = <Accordion key={key} activeIndex={monthsAccordion[key]} onTabChange={(e) => { initMonthTabChange(e, idBrokerAccount, year, month.id) } }>
                    <AccordionTab header={month.description}>
                    <div className={"customBootstrapRow"}>
                        { generateAccountStatement(year, month.id) }
                    </div>
                    </AccordionTab>
                </Accordion>

            accordionMonths.push(accordion);
        });

        return accordionMonths;
    }

    const generateYears = () => {

        let accordionYears: any = [];

        statementDatesList.forEach((yearDate: any) => {
            let accordion = <Accordion key={yearDate.year} activeIndex={yearsAccordion[yearDate.year]} onTabChange={(e) => setYearsAccordion({...yearsAccordion, [yearDate.year]: e.index }) }>
                    <AccordionTab header={yearDate.year}>
                    <div className={"customBootstrapRow"}>
                        {generateMonths(yearDate.year, yearDate.months)}
                    </div>
                    </AccordionTab>
                </Accordion>

            accordionYears.push(accordion);
        });

        return accordionYears;
    }


    return (<div>{generateYears()}</div>);
}

export default AccountStatementListModuleComponent