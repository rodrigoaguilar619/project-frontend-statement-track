import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBrokerAccountListService } from "@app/controller/services/brokerAccountService";
import { faBuilding, faBuildingColumns, faDollar } from '@fortawesome/free-solid-svg-icons';
import { DataTableColumnOptionsPropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import DataTableComponent from 'lib-components-react/lib/components/dataTable/dataTableComponent';
import { tableOptionsTemplateDefault } from "lib-components-react/lib/components/dataTable/tableConfigDefault";
import { ButtonDataTableOptionComponent, ButtonsOrganizerComponent } from 'lib-components-react/lib/components/elements/buttonComponents';
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from 'lib-components-react/lib/components/tooltip/tooltipConfigComponents';
import { setTemplateHeaderSubTitleAction } from "lib-components-react/lib/controller/actions/templateHeaderAction";
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from "lib-components-react/lib/controller/actions/templateLoadingAction";
import { debug, generateDebugClassModule } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageAlertModuleError } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { getSafeNavigate, redirectSamePage } from "lib-components-react/lib/utils/webUtils/routeUtil";
import { columnsBrokerAccountList } from "./brokerAccountListModuleConfig";
import { BrokerAccountListModulePropsI } from "@app/_types/modules/brokerAccount/brokerAccountList";
import { ROUTE_ACCOUNT_STATEMENT_LIST_GET, ROUTE_ACCOUNT_STATEMENT_RESUME_GET, ROUTE_ISSUES_ACCOUNT_LIST_GET } from "@app/catalogs/routesCatalog";

const BrokerAccountListModuleComponent: React.FC<BrokerAccountListModulePropsI> = (props) => {

    const dispatch = useDispatch();
    const navigate = getSafeNavigate();

    const [brokerAccountList, setBrokerAccountList] = useState<[]>([]);

    const optionsTemplate: DataTableColumnOptionsPropsI = tableOptionsTemplateDefault;

    useEffect(() => {

        dispatch(setTemplateHeaderSubTitleAction("Broker account list"));
        optionsTemplate.actionTemplate = actionTemplate;

        initModule();
        return () => {
        };
    }, []);

    const actionTemplate = (rowData: any, column: any) => {

        let buttonOptions = [];

        buttonOptions.push(<ButtonDataTableOptionComponent
            icon={faBuildingColumns as any}
            onClick={() => {
                redirectToAccountStatement(rowData.id);
            }}
            tooltip={"Account Statement"}
        />);

        buttonOptions.push(<ButtonDataTableOptionComponent
            icon={faDollar as any}
            onClick={() => {
                redirectToAccountStatementResume(rowData.id);
            }}
            tooltip={"Account Statement Resume"}
        />);
        
        buttonOptions.push(<ButtonDataTableOptionComponent
            icon={faBuilding as any}
            onClick={() => {
                redirectToIssuesAccount(rowData.id);
            }}
            tooltip={"Account Issues"}
        />); 

        return (<ButtonsOrganizerComponent buttonOptions={buttonOptions} />);
    }

    const redirectToAccountStatement = (idBrokerAccount: number) => {
        redirectSamePage(navigate, ROUTE_ACCOUNT_STATEMENT_LIST_GET, { idBrokerAccount: idBrokerAccount });
    };

    const redirectToAccountStatementResume = (idBrokerAccount: number) => {
        redirectSamePage(navigate, ROUTE_ACCOUNT_STATEMENT_RESUME_GET, { idBrokerAccount: idBrokerAccount });
    };

    const redirectToIssuesAccount = (idBrokerAccount: number) => {
        redirectSamePage(navigate, ROUTE_ISSUES_ACCOUNT_LIST_GET, { idBrokerAccount: idBrokerAccount });
    };

    const initModule = () => {

        let debugClass = generateDebugClassModule("init broker account list module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading broker account list module"));
        axios.all([getBrokerAccountListService()])
            .then(axios.spread((brokerAccountListData) => {

                debug(debugClass, "result", brokerAccountListData);
                setBrokerAccountList(brokerAccountListData.data.brokerAccounts);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    let footerButtons: any[] = [];

    return (<div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DataTableComponent
                    title="Issues"
                    tableWidth="70%"
                    columnDefList={columnsBrokerAccountList}
                    columnDataList={brokerAccountList}
                    footerButtons={footerButtons}
                    columnOptionsTemplate={optionsTemplate}
                    totalRows={brokerAccountList.length} />
        </div>
        <TooltipConfigInputHelp />
        <TooltipConfigCustom />
        <TooltipConfigButtonNestedOptions />
    </div>
    );
}

export default BrokerAccountListModuleComponent