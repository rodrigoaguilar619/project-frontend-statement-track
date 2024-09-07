import { CATALOG_DEFAULT_TYPE_FILTER } from "@app/catalogs/dataCatalog";
import { getYears } from "@app/utils/statementDateUtil";
import { DataTablePropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { FormInputColumnPropsI, FormInputContainerPropsI } from "lib-components-react/lib/@types/components/formInputs/formInputs";
import { InputElementEnum, MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const inputFilterAccountStatementResumeIds = {
    filterType: "filterType",
    filterYear: "filterYear",
    filterDateStart: "filterDateStart",
    filterDateEnd: "filterDateEnd",
}

export const columnsAccountMoneyMovements: DataTablePropsI[] = [
    {
        field: 'dateTransactionMillis', header: 'Date', tableConfig: {
            styleCss: { width: "15%", textAlign: "center" },
        },
        maskProps: {
            maskType: MaskDataTypeEnum.DATE,
            maskDataProps: {
                format: "DD/MM/yyyy HH:mm:ss"
            }
        }
    },
    {
        field: 'typeTransactionDescription', header: 'Operation', tableConfig: {
            styleCss: { width: "25%", textAlign: "center" },
        }
    },
    {
        field: 'amount', header: 'Amount', tableConfig: {
            styleCss: { width: "25%", textAlign: "left" },
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                decimalPlaces: 2,
                addZeroPad: true,
                addSymbolCurrency: true,
                addSeparateComma: true
            }
        }
    }
];

export const columnsAccountDividends: DataTablePropsI[] = [
    {
        field: 'issueInitials', header: 'Issue', tableConfig: {
            styleCss: { width: "25%", textAlign: "center" },
        }
    },
    {
        field: 'issueDescription', header: 'Issue Description', tableConfig: {
            styleCss: { width: "40%", textAlign: "center" },
        }
    },
    {
        field: 'totalDividends', header: 'Total Dividends', tableConfig: {
            styleCss: { width: "25%", textAlign: "left" },
        },
        maskProps: {
            maskType: MaskDataTypeEnum.CURRENCY,
            maskDataProps: {
                decimalPlaces: 2,
                addZeroPad: true,
                addSymbolCurrency: true,
                addSeparateComma: true
            }
        }
    }
];

export const inputColumnsFilter: FormInputColumnPropsI[] = [
    {
        label: "Filter Type:",
        inputProps: {
            id: inputFilterAccountStatementResumeIds.filterType,
            inputType: InputElementEnum.SELECT, value: "", options: [...CATALOG_DEFAULT_TYPE_FILTER], isOptionAll: true
        }
    }
]

export const inputColumnsFilterYearSection: FormInputColumnPropsI[] = [
    {
        label: "Year:",
        inputProps: {
            id: inputFilterAccountStatementResumeIds.filterYear,
            inputType: InputElementEnum.SELECT, value: new Date().getFullYear() + "", options: getYears(), isOptionAll: false
        }
    }
]

export const inputColumnsFilterDateRangeSection: FormInputColumnPropsI[] = [
    {
        label: "Date start:",
        inputProps: {
            id: inputFilterAccountStatementResumeIds.filterDateStart,
            inputType: InputElementEnum.CALENDAR, value: null
        }
    },
    {
        label: "Date end:",
        inputProps: {
            id: inputFilterAccountStatementResumeIds.filterDateEnd,
            inputType: InputElementEnum.CALENDAR, value: null
        }
    }
]


export const columnsFilterAccountStatementResumeFilter: FormInputContainerPropsI = {
    inputColumns: [],
    columnstotal: 4,
    containerWidth: "100%"
}