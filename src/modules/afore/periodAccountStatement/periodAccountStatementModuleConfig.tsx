import { DataTablePropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const columnsPeriodAccountStatementTransactionList: DataTablePropsI[] = [
    {
        field: 'descriptionSection', header: 'Section', tableConfig: {
            styleCss: { width: "40%", textAlign: "left" },
        }
    },
    {
        field: 'descriptionConcept', header: 'Concept', tableConfig: {
            styleCss: { width: "40%", textAlign: "left" },
        }
    },
    {
        field: 'amount', header: 'Amount', tableConfig: {
            styleCss: { width: "20%", textAlign: "center" },
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