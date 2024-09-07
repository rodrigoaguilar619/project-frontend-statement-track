import { FormInputContainerPropsI } from "lib-components-react/lib/@types/components/formInputs/formInputs";
import { InputElementEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const inputIssueIds = {
    id: "id",
    initials: "initials",
    description: "description",
    descriptionCustom: "descriptionCustom"

}

const inputsIssue: FormInputContainerPropsI = {
    inputColumns:  [
        {
            label: "Id Issue:",
            inputProps: {
                id: inputIssueIds.id,
                isReadOnly: true,
                inputType: InputElementEnum.TEXT, value: ''
            },
            validations: {
                idValidation: inputIssueIds.id, validatorRules: ["required"]
            }
        },
        {
            label: "Initials:",
            inputProps: {
                id: inputIssueIds.initials,
                inputType: InputElementEnum.TEXT, value: ''
            },
            validations: {
                idValidation: inputIssueIds.initials, validatorRules: ["required"]
            }
        },
        {
            label: "Description:",
            inputProps: {
                id: inputIssueIds.description,
                inputType: InputElementEnum.TEXT, value: ''
            },
            validations: {
                idValidation: inputIssueIds.description, validatorRules: ["required"]
            }
        },
        {
            label: "Description Custom:",
            inputProps: {
                id: inputIssueIds.descriptionCustom,
                inputType: InputElementEnum.TEXT, value: ''
            },
            validations: {
                idValidation: inputIssueIds.descriptionCustom, validatorRules: ["required"]
            }
        }
    ],
    columnstotal: 3,
    containerWidth: "100%"
}

export const formContainersIssueMovement: FormInputContainerPropsI[] = [inputsIssue];