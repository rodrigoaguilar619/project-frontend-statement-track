import { CATALOG_DEFAULT_MONTH } from "@app/catalogs/dataCatalog";
import { FormInputContainerPropsI } from "lib-components-react/lib/@types/components/formInputs/formInputs";
import { InputElementEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const inputFilterAccountStatementIds = {
    filterYear: "filterYear",
    filterMonth: "filterMonth",
    filterBrokerAccount: "filterBrokerAccount",
}

export const columnsFilterAccountStatementList: FormInputContainerPropsI = {
    inputColumns: [
        {
            label: "Year:",
            inputProps: {
                id: inputFilterAccountStatementIds.filterYear,
                inputType: InputElementEnum.SELECT, value: new Date().getFullYear() + "", options: [], isOptionAll: false
            }
        },
        {
            label: "Month:",
            inputProps: {
                id: inputFilterAccountStatementIds.filterMonth,
                inputType: InputElementEnum.SELECT, value: "1", options: [...CATALOG_DEFAULT_MONTH], isOptionAll: false
            }
        },
        {
            label: "Broker Account:",
            inputProps: {
                id: inputFilterAccountStatementIds.filterBrokerAccount,
                inputType: InputElementEnum.SELECT, value: 1, options: [], isOptionAll: false
            }
        }
    ],
    columnstotal: 4,
    containerWidth: "100%"
}