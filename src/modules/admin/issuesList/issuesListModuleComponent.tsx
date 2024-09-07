import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { IssuesListModulePropsI } from "@app/_types/modules/issues/issuesList";
import { getIssuesListService } from "@app/controller/services/issuesService";
import { faAdd, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DataTableColumnOptionsPropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { ComponentTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import DataTableComponent from 'lib-components-react/lib/components/dataTable/dataTableComponent';
import { tableOptionsTemplateDefault } from "lib-components-react/lib/components/dataTable/tableConfigDefault";
import { ButtonCustomComponent, ButtonDataTableOptionComponent, ButtonsOrganizerComponent } from 'lib-components-react/lib/components/elements/buttonComponents';
import ModalComponent from "lib-components-react/lib/components/modals/modalComponent";
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from 'lib-components-react/lib/components/tooltip/tooltipConfigComponents';
import { setTemplateHeaderSubTitleAction } from "lib-components-react/lib/controller/actions/templateHeaderAction";
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from "lib-components-react/lib/controller/actions/templateLoadingAction";
import useHookModal from 'lib-components-react/lib/hookStates/modalHookState';
import { debug, generateDebugClassModule } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageAlertModuleError } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { columnsIssuesList } from "./issuesListModuleConfig";

const IssuesListModuleComponent: React.FC<IssuesListModulePropsI> = (props) => {

    const dispatch = useDispatch();
    const [issuesList, setIssuesList] = useState<[]>([]);
    const [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal] = useHookModal();
    const optionsTemplate: DataTableColumnOptionsPropsI = tableOptionsTemplateDefault;

    const IssueAddEditModuleComponent = React.lazy(() => import('@app/modules/admin/issueAddEdit/issueAddEditModuleComponent'));
    
    useEffect(() => {

        dispatch(setTemplateHeaderSubTitleAction("Issues list"));
        optionsTemplate.actionTemplate = actionTemplate;

        initModule();
        return () => {
        };
    }, []);

    const actionTemplate = (rowData: any, column: any) => {

        let buttonOptions = [];

        buttonOptions.push(<ButtonDataTableOptionComponent
            icon={faEdit as any}
            onClick={() => {
                setTitleModal("EDIT ISSUE: " + rowData.initials);
                setBodyModal((<IssueAddEditModuleComponent idIssue={rowData.id} componentType={ComponentTypeEnum.POPUP} executeParentFunction={() => { initModule(); setCloseModal(); }} />));
                setOpenModal()
            }}
            tooltip={"Edit issue: " + rowData.initials}
        />);    

        return (<ButtonsOrganizerComponent buttonOptions={buttonOptions} />);
    }

    const initModule = () => {

        let debugClass = generateDebugClassModule("init issues list module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading issues list module"));
        axios.all([getIssuesListService()])
            .then(axios.spread((issuesListData) => {

                debug(debugClass, "result", issuesListData);
                setIssuesList(issuesListData.data.catalogs);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    let footerButtons: any[] = [];
    footerButtons.push(<ButtonCustomComponent
        icon={faAdd as any}
        label="Add issues"
        onClick={() => {
            setTitleModal("ADD ISSUES");
            setBodyModal((<IssueAddEditModuleComponent componentType={ComponentTypeEnum.POPUP} executeParentFunction={() => { initModule(); setCloseModal(); }} />));
            setOpenModal()
        }}
    />);

    return (<div>
        <ModalComponent title={modalState.titleModal} visible={modalState.showModal} selectorCloseModal={setCloseModal}
            body={modalState.bodyModal} size='sm' />
        <br></br>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <DataTableComponent
                    title="Issues"
                    tableWidth="70%"
                    columnDefList={columnsIssuesList}
                    columnDataList={issuesList}
                    footerButtons={footerButtons}
                    columnOptionsTemplate={optionsTemplate}
                    totalRows={issuesList.length} />
        </div>
        <TooltipConfigInputHelp />
        <TooltipConfigCustom />
        <TooltipConfigButtonNestedOptions />
    </div>
    );
}

export default IssuesListModuleComponent