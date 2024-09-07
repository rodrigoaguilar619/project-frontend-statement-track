import { FormInputContainerPropsI } from "lib-components-react/lib/@types/components/formInputs/formInputs";
import { InputElementEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const inputLoadAccountStatementFileIds = {
    idBroker: "idBroker",
    file: "file"
}

const inputsTransactionIssuesFile: FormInputContainerPropsI = {
    inputColumns: [
        {
            label: "Broker:",
            inputProps: {
                id: inputLoadAccountStatementFileIds.idBroker,
                inputType: InputElementEnum.SELECT, value: '', options: []
            },
            validations: {
                idValidation: inputLoadAccountStatementFileIds.idBroker, validatorRules: ["required"]
            }
        },
        {
            label: "File Account Statement:",
            inputProps: {
                id: inputLoadAccountStatementFileIds.file,
                inputType: InputElementEnum.FILE, value: null, options: []
            },
            validations: {
                idValidation: inputLoadAccountStatementFileIds.file, validatorRules: ["required"]
            }
        }
    ],
    columnstotal: 2,
    containerWidth: "100%"
}

export const formContainersAccountStatementFile: FormInputContainerPropsI[] = [inputsTransactionIssuesFile];