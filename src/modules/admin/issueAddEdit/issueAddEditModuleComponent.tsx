import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { IssueAddEditModulePropsI } from '@app/_types/modules/issues/issueAddEdit';
import { addEditIssueService, getIssueByIdService } from '@app/controller/services/issuesService';
import { FormInputColumnPropsI, FormInputContainerPropsI } from 'lib-components-react/lib/@types/components/formInputs/formInputs';
import { ComponentTypeEnum, OptionAddEditEnum } from 'lib-components-react/lib/catalogs/enumCatalog';
import { ButtonSubmitComponent, ButtonsOrganizerComponent } from 'lib-components-react/lib/components/elements/buttonComponents';
import FormInputContainersComponent from 'lib-components-react/lib/components/forms/formInputContainersComponent';
import { setTemplateLoadingActiveMessageAction, setTemplateLoadingIsActiveAction } from 'lib-components-react/lib/controller/actions/templateLoadingAction';
import { buildAlertSuccessRedux } from 'lib-components-react/lib/utils/componentUtils/alertUtil';
import { buildFormDataContainers, getParameterCall } from 'lib-components-react/lib/utils/componentUtils/formUtil';
import { dispatchTemplateHeaderSubTitleAction } from 'lib-components-react/lib/utils/componentUtils/templateUtil';
import { deepClone } from 'lib-components-react/lib/utils/dataUtils/dataUtil';
import { buildSimpleReactValidator } from 'lib-components-react/lib/utils/pluginUtils/simpleReactValidatorUtil';
import { debug, generateDebugClassModule, showDataDevelopment } from 'lib-components-react/lib/utils/webUtils/debugUtil';
import { manageAlertModuleError } from 'lib-components-react/lib/utils/webUtils/httpManagerUtil';
import { formContainersIssueMovement as formContainersIssue, inputIssueIds } from './issueAddEditModuleConfig';

const IssueMovementAddEditModuleComponent: React.FC<IssueAddEditModulePropsI> = (props) => {

    const dispatch = useDispatch();
    const location = useLocation();
    const idIssue = getParameterCall(location, props, "idIssue");
    const optionAddEdit: OptionAddEditEnum = idIssue ? OptionAddEditEnum.EDIT : OptionAddEditEnum.ADD;
    const [formIssueData, setFormIssueData] = useState<Record<string, any>>({});
    const [formContainersIssueModule, setFormContainersIssueModule] = useState<FormInputContainerPropsI[]>(formContainersIssue);
    const [isForceUpdate, setIsForceUpdate] = useState<boolean>(false);
    const validatorControl: any = useRef(buildSimpleReactValidator());

    useEffect(() => {

        dispatchTemplateHeaderSubTitleAction(dispatch, props.componentType, idIssue ? "Edit issue " + idIssue : "Add issue");
        idIssue ? initEditModule() : initAddModule();

        return () => {
        };
    }, []);

    const initAddModule = () => {
        let formContainersIssueBlock:  FormInputContainerPropsI[] = deepClone(formContainersIssue);

        formContainersIssueBlock.forEach((inputContainer: { inputColumns: FormInputColumnPropsI[]; }) => {

            inputContainer.inputColumns.forEach((inputColumn: FormInputColumnPropsI) => {
                if (inputColumn.inputProps.id === inputIssueIds.id) {
                    inputColumn.showColumn = false;
                }
            });
        });
        
        setFormContainersIssueModule(formContainersIssueBlock);
        setFormIssueData(buildFormDataContainers(formContainersIssueBlock));
    }


    const initEditModule = () => {

        let debugClass = generateDebugClassModule("init " + optionAddEdit + " issue module");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, "Loading issue data module"));

        axios.all([getIssueByIdService(idIssue)])
            .then(axios.spread((issueData) => {

                let formContainersIssueBlock:  FormInputContainerPropsI[] = deepClone(formContainersIssue);
                formContainersIssueBlock[0].columnstotal = 4;

                setFormContainersIssueModule(formContainersIssueBlock);
                setFormIssueData(issueData.data.catalogIssueData);
            }))
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
            })
            .finally(() => {
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const showAlertSuccess = (componentType: ComponentTypeEnum) => {
        buildAlertSuccessRedux(dispatch, componentType, "Issue Movement " + formIssueData.issue + " " + optionAddEdit + " successfully");
    }

    const executeSubmitIssueFormData = () => {

        let debugClass = generateDebugClassModule("init submit issue movement form data");
        debug(debugClass, "start");

        dispatch(setTemplateLoadingActiveMessageAction(true, optionAddEdit + " issue movement"));
        axios.all([addEditIssueService(optionAddEdit, formIssueData)])
            .then(axios.spread((addEditIssueData) => {

                debug(debugClass, "result", addEditIssueData);
                dispatch(setTemplateLoadingIsActiveAction(false));

            }))
            .then(() => {
                
                if (props.executeParentFunction) {
                    props.executeParentFunction();
                    showAlertSuccess(ComponentTypeEnum.MODULE);
                }
                else
                    showAlertSuccess(props.componentType);
            })
            .catch((error) => {
                manageAlertModuleError(dispatch, props.componentType, debugClass, error);
                dispatch(setTemplateLoadingIsActiveAction(false));
            });
    }

    const submitIssueData = () => {

        if (validatorControl.current.allValid()) {
            executeSubmitIssueFormData();
        } else {
            validatorControl.current.showMessages();
            setIsForceUpdate(!isForceUpdate);
        }
    };

    let buttons = [
        <ButtonSubmitComponent key="save-button" label={optionAddEdit + " Issue"} onClick={ () => submitIssueData()} />
    ]

    return (<div>
        <br></br>
        <FormInputContainersComponent formContainers={formContainersIssueModule} formData={formIssueData}
            validatorControl={validatorControl} selectorUpdateFormData={setFormIssueData} />
        <br></br>
        <br></br>
        <ButtonsOrganizerComponent buttonOptions={buttons} justifyContent="right" />
        <br></br>
        {showDataDevelopment("formIssueMovementData", formIssueData)}
    </div>
    );
}

export default IssueMovementAddEditModuleComponent