import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AccountStatementResumeModulePropsI } from "@app/_types/modules/statement/accountStatementResume";
import { CatalogDataTypeEnum } from "@app/catalogs/enumCatalog";
import { getAccountStatementResumeService } from "@app/controller/services/accountStatementService";
import IssueDividendsAccountListModuleComponent from "@app/modules/broker/issueDividendsAccountList/issueDividendsAccountListModuleComponent";
import { faPeopleArrows } from "@fortawesome/free-solid-svg-icons";
import { DataTableColumnOptionsPropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { FormInputColumnPropsI, FormInputContainerPropsI } from "lib-components-react/lib/@types/components/formInputs/formInputs";
import { ComponentTypeEnum, MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import DataTableComponent from 'lib-components-react/lib/components/dataTable/dataTableComponent';
import { tableOptionsTemplateDefault } from "lib-components-react/lib/components/dataTable/tableConfigDefault";
import { ButtonDataTableOptionComponent, ButtonsOrganizerComponent } from "lib-components-react/lib/components/elements/buttonComponents";
import FilterAccoridionComponent from "lib-components-react/lib/components/filterAccordion/filterAccordionComponent";
import ModalComponent from "lib-components-react/lib/components/modals/modalComponent";
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from "lib-components-react/lib/components/tooltip/tooltipConfigComponents";
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from "lib-components-react/lib/controller/actions/templateLoadingAction";
import useHookModal from "lib-components-react/lib/hookStates/modalHookState";
import { buildFormDataContainers, getParameterCall } from "lib-components-react/lib/utils/componentUtils/formUtil";
import { maskData } from "lib-components-react/lib/utils/dataUtils/maskDataUtil";
import { debug, generateDebugClassModule } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageAlertModuleError } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { getSafeLocation } from "lib-components-react/lib/utils/webUtils/routeUtil";
import { columnsAccountDividends, columnsAccountMoneyMovements, columnsFilterAccountStatementResumeFilter, inputColumnsFilter, inputColumnsFilterDateRangeSection, inputColumnsFilterYearSection, inputFilterAccountStatementResumeIds } from "./accountStatementResumeModuleConfig";

const AccountStatementResumeModuleComponent: React.FC<AccountStatementResumeModulePropsI> = (props) => {

    const dispatch = useDispatch();
    let location = getSafeLocation();

    const idBrokerAccount = getParameterCall(location, props, "idBrokerAccount");
    const [modalState, setOpenModal, setCloseModal, setBodyModal, setTitleModal] = useHookModal();
    const [columnsFilter, setColumnsFilter] = useState<FormInputContainerPropsI>({...columnsFilterAccountStatementResumeFilter});
    const [formFilterData, setFormFilterData] = useState<Record<string, any>>({});
    const [accountResumeData, setAccountResumeData] = useState<any>({ movementsMoney: [], movementsMoneyDividend: [] });

    const optionsTemplate: DataTableColumnOptionsPropsI = tableOptionsTemplateDefault;

    useEffect(() => {
        initModule();
        optionsTemplate.actionTemplate = actionTemplate;
    }, []);

    useEffect(() => {

        if (formFilterData[inputFilterAccountStatementResumeIds.filterType] !== undefined) {
            changeTypeFilter();
        }

    }, [formFilterData[inputFilterAccountStatementResumeIds.filterType]]);

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

    const maskNumber = (value: number) => {
        return maskData(value, { 
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: { 
                decimalPlaces: 2,
                addZeroPad: true,
                addSymbolCurrency: true,
                addSeparateComma: true  
            }
        });
    }

    const maskDate = (value: number) => {

        if (value === null || value === undefined) return "---";

        return maskData(value, { 
                maskType: MaskDataTypeEnum.DATE, maskDataProps: {
                format: "DD/MM/yyyy HH:mm:ss"
            }
        });
    }

    const initModule = () => {
        let columnsFilter = {...columnsFilterAccountStatementResumeFilter, inputColumns: [...inputColumnsFilter]};
        let formFilterData = buildFormDataContainers([columnsFilter]);
        
        setColumnsFilter(columnsFilter);
        setFormFilterData(formFilterData);

        executeResumeSearch();
    }

    const changeTypeFilter = () => {

        let inputColumnsFilter: FormInputColumnPropsI[] = columnsFilter.inputColumns.filter((inputColumn: FormInputColumnPropsI) => {
            return inputColumn.inputProps.id === inputFilterAccountStatementResumeIds.filterType
        });

        if (formFilterData[inputFilterAccountStatementResumeIds.filterType] === CatalogDataTypeEnum.YEAR) {
            inputColumnsFilter = inputColumnsFilter.concat(inputColumnsFilterYearSection);
        }
        else if (formFilterData[inputFilterAccountStatementResumeIds.filterType] === CatalogDataTypeEnum.RANGE_DATE) {
            inputColumnsFilter = inputColumnsFilter.concat(inputColumnsFilterDateRangeSection);
        }
        let columnsFilterNew = {...columnsFilterAccountStatementResumeFilter, inputColumns: [...inputColumnsFilter]};
        setColumnsFilter(columnsFilterNew);
    }

    const executeResumeSearch = () => {

        let debugClass = generateDebugClassModule("init account statement resume search module");
        debug(debugClass, "start");
    
        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading account statement resume search module"));
        
        let filters: Record<string, any> = {};
        
        if(formFilterData[inputFilterAccountStatementResumeIds.filterType] === CatalogDataTypeEnum.YEAR) {
            let dateStart = new Date();
            dateStart.setFullYear(formFilterData[inputFilterAccountStatementResumeIds.filterYear]);
            dateStart.setMonth(0);
            dateStart.setDate(1);

            let dateEnd = new Date();
            dateEnd.setFullYear(formFilterData[inputFilterAccountStatementResumeIds.filterYear]);
            dateEnd.setMonth(11);
            dateEnd.setDate(31);

            filters[inputFilterAccountStatementResumeIds.filterDateStart] = dateStart.getTime();
            filters[inputFilterAccountStatementResumeIds.filterDateEnd] = dateEnd.getTime();
        }
        
        axios.all([getAccountStatementResumeService(idBrokerAccount, filters)])
          .then(axios.spread((accountResumeData) => {
    
            debug(debugClass, "result", accountResumeData);

            setAccountResumeData(accountResumeData.data);
            
            dispatch(setTemplateLoadingIsActiveAction(false));
    
          }))
          .catch((error) => {
            manageAlertModuleError(dispatch, props.componentType, debugClass, error);
            dispatch(setTemplateLoadingIsActiveAction(false));
          });
      }

    return (<div>
        <ModalComponent title={modalState.titleModal} visible={modalState.showModal} selectorCloseModal={setCloseModal}
            body={modalState.bodyModal} />
        <FilterAccoridionComponent
            formContainer={columnsFilter}
            title="Account Statement Filter"
            formData={formFilterData}
            executeFilterSearch={executeResumeSearch}
            selectorUpdateFormData={setFormFilterData}
        />
        <br></br>
        <div style={{padding: "3px"}}>
            <div>
                <div style={{float: "left", width: "20%"}}><b>Date start: {maskDate(formFilterData[inputFilterAccountStatementResumeIds.filterDateStart])}</b></div>
                <div style={{float: "left", width: "25%"}}><b>Total Deposits: {maskNumber(accountResumeData.totalDeposits)}</b></div>
                <div style={{float: "left", width: "20%"}}><b>Total Withdraws: {maskNumber(accountResumeData.totalWithdraws)}</b></div>
            </div>
            <div style={{clear: "both", paddingTop: "2px"}}>
                <div style={{float: "left", width: "20%"}}><b>Date end_: {maskDate(formFilterData[inputFilterAccountStatementResumeIds.filterDateEnd])}</b></div>
                <div style={{float: "left", width: "25%"}}><b>Total Dividends: {maskNumber(accountResumeData.totalDividends)}</b></div>
                <div style={{float: "left", width: "20%"}}><b>Current Balance: {maskNumber(accountResumeData.currentBalance)}</b></div>
            </div>
        </div>
        <br></br><br></br>
        <div style={{clear: "both", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "1fr 1fr"}}>
            <div style={{float: "left", width: "99%"}}>
                <DataTableComponent
                title="Account Movements Money"
                tableWidth="100%"
                columnDefList={columnsAccountMoneyMovements}
                columnDataList={accountResumeData.movementsMoney}
                totalRows={accountResumeData.movementsMoney.length}
                isShowSearch={false}
                isShowRowsPage={false}
                extraProps={{scrollable: true, scrollHeight: "350px" }} />
            </div>
            <div style={{float: "left", width: "99%"}}>
                <div style={{float: "left", width: "99%"}}>
                    <DataTableComponent
                    title="Account Dividends Money"
                    tableWidth="100%"
                    columnDefList={columnsAccountDividends}
                    columnDataList={accountResumeData.movementsMoneyDividend}
                    totalRows={accountResumeData.movementsMoneyDividend.length}
                    columnOptionsTemplate={optionsTemplate}
                    isShowSearch={false}
                    isShowRowsPage={false}
                    extraProps={{scrollable: true, scrollHeight: "350px" }} />
                </div>
            </div>
        </div>
        <br></br>
        <TooltipConfigInputHelp />
        <TooltipConfigCustom />
        <TooltipConfigButtonNestedOptions />
    </div>)
}

export default AccountStatementResumeModuleComponent