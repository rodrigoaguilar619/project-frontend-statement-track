import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IssuesAccountListModulePropsI } from "@app/_types/modules/brokerAccount/issuesAccountList";
import { getIssuesAccountListService } from "@app/controller/services/brokerAccountService";
import { faPeopleArrows } from '@fortawesome/free-solid-svg-icons';
import { DataTableColumnOptionsPropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { ComponentTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import DataTableComponent from 'lib-components-react/lib/components/dataTable/dataTableComponent';
import { tableOptionsTemplateDefault } from "lib-components-react/lib/components/dataTable/tableConfigDefault";
import { ButtonDataTableOptionComponent, ButtonsOrganizerComponent } from 'lib-components-react/lib/components/elements/buttonComponents';
import ModalComponent from "lib-components-react/lib/components/modals/modalComponent";
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from 'lib-components-react/lib/components/tooltip/tooltipConfigComponents';
import { setTemplateHeaderSubTitleAction } from "lib-components-react/lib/controller/actions/templateHeaderAction";
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from "lib-components-react/lib/controller/actions/templateLoadingAction";
import useHookModal from 'lib-components-react/lib/hookStates/modalHookState';
import { getParameterCall } from "lib-components-react/lib/utils/componentUtils/formUtil";
import { debug, generateDebugClassModule } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageAlertModuleError } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { getSafeLocation } from "lib-components-react/lib/utils/webUtils/routeUtil";
import { columnsIssuesAccountList } from "./issuesAccountListModuleConfig";
const IssuesAccountListModuleComponent: React.FC<IssuesAccountListModulePropsI> = (props) => {

    const dispatch = useDispatch();
    let location = getSafeLocation();

    const idBrokerAccount = getParameterCall(location, props, "idBrokerAccount");
    const [issuesAccountList, setIssuesAccountList] = useState<[]>([]);
    const [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal] = useHookModal();
    const optionsTemplate: DataTableColumnOptionsPropsI = tableOptionsTemplateDefault;

    const IssueDividendsAccountListModuleComponent = React.lazy(() => import('@app/modules/broker/issueDividendsAccountList/issueDividendsAccountListModuleComponent'));
    
    useEffect(() => {

        dispatch(setTemplateHeaderSubTitleAction("Issues account list"));
        optionsTemplate.actionTemplate = actionTemplate;
        
        initModule();
        return () => {
        };
    }, []);

    const actionTemplate = (rowData: any, column: any) => {

        let buttonOptions = [];

        buttonOptions.push(<ButtonDataTableOptionComponent
            icon={faPeopleArrows as any}
            onClick={() => {
                setTitleModal("Account Issues dividends. Issue: " + rowData.issueDescription);
                setBodyModal((<IssueDividendsAccountListModuleComponent idIssue={rowData.idIssue} idBrokerAccount={idBrokerAccount} componentType={ComponentTypeEnum.POPUP} executeParentFunction={() => { setCloseModal(); }} />));
                setOpenModal()
            }}
            tooltip={"Account Issues dividends: " + rowData.issueDescription}
        />);    

        return (<ButtonsOrganizerComponent buttonOptions={buttonOptions} />);
    }

    const initModule = () => {

        let debugClass = generateDebugClassModule("init issues account list module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading issues account list module"));
        axios.all([getIssuesAccountListService(idBrokerAccount)])
            .then(axios.spread((issueAccountListData) => {

                debug(debugClass, "result", issueAccountListData);
                setIssuesAccountList(issueAccountListData.data.issuesBuy);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    let footerButtons: any[] = [];

    return (<div>
        <ModalComponent title={modalState.titleModal} visible={modalState.showModal} selectorCloseModal={setCloseModal}
            body={modalState.bodyModal} size='sm' />
        <br></br>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DataTableComponent
                    title="Issues"
                    tableWidth="70%"
                    columnDefList={columnsIssuesAccountList}
                    columnDataList={issuesAccountList}
                    footerButtons={footerButtons}
                    columnOptionsTemplate={optionsTemplate}
                    totalRows={issuesAccountList.length} />
        </div>
        <TooltipConfigInputHelp />
        <TooltipConfigCustom />
        <TooltipConfigButtonNestedOptions />
    </div>
    );
}

export default IssuesAccountListModuleComponent