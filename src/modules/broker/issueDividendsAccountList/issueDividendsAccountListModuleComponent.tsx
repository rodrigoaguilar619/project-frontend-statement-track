import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IssueDividendsAccountListModulePropsI } from "@app/_types/modules/brokerAccount/issueDividendsAccountList";
import { getIssueDividendsAccountListService } from "@app/controller/services/brokerAccountService";
import DataTableComponent from 'lib-components-react/lib/components/dataTable/dataTableComponent';
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from 'lib-components-react/lib/components/tooltip/tooltipConfigComponents';
import { setTemplateHeaderSubTitleAction } from "lib-components-react/lib/controller/actions/templateHeaderAction";
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from "lib-components-react/lib/controller/actions/templateLoadingAction";
import { debug, generateDebugClassModule } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageAlertModuleError } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { columnsIssueDividendsAccountList } from "./issueDividendsAccountListModuleConfig";

const IssueDividendsAccountListModuleComponent: React.FC<IssueDividendsAccountListModulePropsI> = (props) => {

    const dispatch = useDispatch();

    const [issuesAccountList, setIssuesAccountList] = useState<[]>([]);
    
    useEffect(() => {

        dispatch(setTemplateHeaderSubTitleAction("Issue dividends account list"));
        initModule();
        return () => {
        };
    }, []);

    const initModule = () => {

        let debugClass = generateDebugClassModule("init issue dividends account list module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading issue dividends account list module"));
        axios.all([getIssueDividendsAccountListService(props.idBrokerAccount, props.idIssue)])
            .then(axios.spread((issueDividendsAccountListData) => {

                debug(debugClass, "result", issueDividendsAccountListData);
                setIssuesAccountList(issueDividendsAccountListData.data.movementMoneyDividends);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    let footerButtons: any[] = [];

    return (<div>
        <br></br>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DataTableComponent
                    title="Issues"
                    tableWidth="75%"
                    columnDefList={columnsIssueDividendsAccountList}
                    columnDataList={issuesAccountList}
                    footerButtons={footerButtons}
                    totalRows={issuesAccountList.length} />
        </div>
        <TooltipConfigInputHelp />
        <TooltipConfigCustom />
        <TooltipConfigButtonNestedOptions />
    </div>
    );
}

export default IssueDividendsAccountListModuleComponent