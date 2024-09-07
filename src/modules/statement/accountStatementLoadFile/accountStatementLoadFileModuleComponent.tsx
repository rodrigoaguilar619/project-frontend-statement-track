import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { CatalogModuleEnum } from '@app/catalogs/enumCatalog';
import { getCatalogDataService } from '@app/controller/services/catalogService';
import { ComponentTypeEnum } from 'lib-components-react/lib/catalogs/enumCatalog';
import { ButtonSubmitComponent, ButtonsOrganizerComponent } from 'lib-components-react/lib/components/elements/buttonComponents';
import FormInputContainersComponent from 'lib-components-react/lib/components/forms/formInputContainersComponent';
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from 'lib-components-react/lib/controller/actions/templateLoadingAction';
import { buildAlertSuccessRedux } from 'lib-components-react/lib/utils/componentUtils/alertUtil';
import { buildFormDataContainers, setOptionsToColumnsContainerDefList } from 'lib-components-react/lib/utils/componentUtils/formUtil';
import { dispatchTemplateHeaderSubTitleAction } from 'lib-components-react/lib/utils/componentUtils/templateUtil';
import { buildSimpleReactValidator } from 'lib-components-react/lib/utils/pluginUtils/simpleReactValidatorUtil';
import { debug, generateDebugClassModule, showDataDevelopment } from 'lib-components-react/lib/utils/webUtils/debugUtil';
import { manageAlertModuleError } from 'lib-components-react/lib/utils/webUtils/httpManagerUtil';
import { AccountStatementFileLoadModulePropsI } from '@app/_types/modules/statement/accountStatementFileLoad';
import { formContainersAccountStatementFile, inputLoadAccountStatementFileIds } from './accountStatementLoadFileModuleConfig';
import { loadAccountStatementFileService } from '@app/controller/services/accountStatementService';

const AccountStatementLoadFileModuleComponent: React.FC<AccountStatementFileLoadModulePropsI> = (props) => {

    const dispatch = useDispatch();
    const [formAccountStatementFileData, setFormAccountStatementFileData] = useState<Record<string, any>>({});
    const [isForceUpdate, setIsForceUpdate] = useState<boolean>(false);
    const validatorControl: any = useRef(buildSimpleReactValidator());

    useEffect(() => {

        dispatchTemplateHeaderSubTitleAction(dispatch, props.componentType, "Load Account Statement File");
        initModule();

        return () => {
        };
    }, []);

    const initModule = () => {

        let debugClass = generateDebugClassModule("init load account statement file module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading load account statement module"));
        axios.all([getCatalogDataService(CatalogModuleEnum.BROKER_ACCOUNT)])
            .then(axios.spread((brokersListData) => {

                debug(debugClass, "result", brokersListData);
                setOptionsToColumnsContainerDefList(formContainersAccountStatementFile, brokersListData.data.catalogs, inputLoadAccountStatementFileIds.idBroker);
                setFormAccountStatementFileData(buildFormDataContainers(formContainersAccountStatementFile));
                
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const showAlertSuccess = (componentType: ComponentTypeEnum) => {
        buildAlertSuccessRedux(dispatch, componentType, "Account statement loaded successfully");
    }

    const executeSubmitAccountStatementFormData = () => {

        let debugClass = generateDebugClassModule("init submit account statement file form data");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading account statement file"));
        axios.all([loadAccountStatementFileService(formAccountStatementFileData)])
            .then(axios.spread((loadTransactionIssuesData) => {

                debug(debugClass, "result", loadTransactionIssuesData);
                showAlertSuccess(props.componentType);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const submitAccountStatementData = () => {

        if (validatorControl.current.allValid()) {
            executeSubmitAccountStatementFormData();
        } else {
            validatorControl.current.showMessages();
            setIsForceUpdate(!isForceUpdate);
        }
    };

    let buttons = [
        <ButtonSubmitComponent key="save-button" label={"Load Account Statement"} onClick={submitAccountStatementData} />
    ]

    return (<div>
        <br></br>
        <FormInputContainersComponent formContainers={formContainersAccountStatementFile} formData={formAccountStatementFileData}
            validatorControl={validatorControl} selectorUpdateFormData={setFormAccountStatementFileData} />
        <br></br>
        <ButtonsOrganizerComponent buttonOptions={buttons} justifyContent="right" />
        <br></br>
        {showDataDevelopment("formIssueMovementData", formAccountStatementFileData)}
    </div>
    );
}

export default AccountStatementLoadFileModuleComponent