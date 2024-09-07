
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import FilterAccoridionComponent from 'lib-components-react/lib/components/filterAccordion/filterAccordionComponent';
import { TooltipConfigButtonNestedOptions, TooltipConfigCustom, TooltipConfigInputHelp } from 'lib-components-react/lib/components/tooltip/tooltipConfigComponents';
import { setTemplateHeaderSubTitleAction } from 'lib-components-react/lib/controller/actions/templateHeaderAction';
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from 'lib-components-react/lib/controller/actions/templateLoadingAction';
import { buildFormDataContainers, setOptionsToColumnsDefList } from 'lib-components-react/lib/utils/componentUtils/formUtil';
import { debug, generateDebugClassModule } from 'lib-components-react/lib/utils/webUtils/debugUtil';
import { manageAlertModuleError } from 'lib-components-react/lib/utils/webUtils/httpManagerUtil';
import LoadingModuleComponent from 'lib-components-react/lib/components/loadings/loadingModuleComponent';
import useHookLoading from 'lib-components-react/lib/hookStates/loadingHookState';
import { columnsFilterAccountStatementList, inputFilterAccountStatementIds } from './accountStatementFilterModuleConfig';
import { AccountStatementFilterModulePropsI } from '@app/_types/modules/statement/accountStatementFilter';
import { getCatalogDataService } from '@app/controller/services/catalogService';
import { CatalogModuleEnum } from '@app/catalogs/enumCatalog';
import { getMonthName, getYears } from '@app/utils/statementDateUtil';
import { getAccountStatementService } from '@app/controller/services/accountStatementService';
import AccountStatementModuleComponent from '../accountStatement/accountStatementModuleComponent';

const AccountStatementFilterModuleComponent: React.FC<AccountStatementFilterModulePropsI> = (props) => {

  const dispatch = useDispatch();
  const [loadingState, setLoading] = useHookLoading();
  const [accountStatement, setAccountStatement] = useState<any>(null);
  const [formFilterData, setFormFilterData] = useState<Record<string, any>>(buildFormDataContainers([columnsFilterAccountStatementList]));

  useEffect(() => {

    dispatch(setTemplateHeaderSubTitleAction("Account statement filter"));
    initModule();
    return () => {
    };
  }, []);

  const initModule = () => {

    let debugClass = generateDebugClassModule("init account statement filter module");
    debug(debugClass, "start");

    dispatch(setTemplateLoadingActiveMessageAction(true, "Loading account statement filter module"));
    axios.all([getCatalogDataService(CatalogModuleEnum.BROKER_ACCOUNT)])
      .then(axios.spread((brokerAccountCatalogData) => {

        debug(debugClass, "result", brokerAccountCatalogData);
        
        let yearCatalog = getYears();
        setOptionsToColumnsDefList(columnsFilterAccountStatementList.inputColumns, brokerAccountCatalogData.data.catalogs, inputFilterAccountStatementIds.filterBrokerAccount);
        setOptionsToColumnsDefList(columnsFilterAccountStatementList.inputColumns, yearCatalog, inputFilterAccountStatementIds.filterYear);
        dispatch(setTemplateLoadingIsActiveAction(false));

      }))
      .catch((error) => {
        manageAlertModuleError(dispatch, props.componentType, debugClass, error);
        dispatch(setTemplateLoadingIsActiveAction(false));
      })
      .finally(() => {
        setLoading(false);
    });
  }

  const executeGetAccountStatement = () => {

    let debugClass = generateDebugClassModule("init get account statement");
    debug(debugClass, "start");

    axios.all([getAccountStatementService(formFilterData.filterBrokerAccount, formFilterData.filterYear, formFilterData.filterMonth)])
      .then(axios.spread((accountStatementData) => {

        debug(debugClass, "result", accountStatementData);
        setAccountStatement(accountStatementData.data);

      }))
      .catch((error) => {
        manageAlertModuleError(dispatch, props.componentType, debugClass, error);
      });
  }

  const executeResetAccountStatement = () => {

    executeGetAccountStatement();
  }

  const renderAccountStatement = () => {

    if (accountStatement !== null)
        return <AccountStatementModuleComponent 
            accountStatementTransactions={accountStatement.operationsStatement}
            previousBalance={accountStatement.previousBalance}
            currentBalance={accountStatement.currentBalance} 
            dayCut={accountStatement.brokerAccountResume.cutDay}
            brokerAccount={accountStatement.brokerAccountResume.accountDescription}
            month={getMonthName(accountStatement.month)}
            year={accountStatement.year}
        />
    else
        return null;
}

  if(loadingState.isLoading)
    return <LoadingModuleComponent />

  return (<div style={{ height: "fit-content" }}>
    <br></br>
    <FilterAccoridionComponent
      formContainer={columnsFilterAccountStatementList}
      title="Account Statement Filter"
      formData={formFilterData}
      executeFilterSearch={executeResetAccountStatement}
      selectorUpdateFormData={setFormFilterData}
    />
    <br></br>
    {renderAccountStatement()}
    <br></br>
    <TooltipConfigInputHelp />
    <TooltipConfigCustom />
    <TooltipConfigButtonNestedOptions />
  </div>)
}

export default AccountStatementFilterModuleComponent