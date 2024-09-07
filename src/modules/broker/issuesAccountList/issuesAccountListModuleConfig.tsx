import { DataTablePropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const columnsIssuesAccountList: DataTablePropsI[] = [
    {
        field: 'issueAbreviation', header: 'Id', tableConfig: {
            styleCss: { width: "25%", textAlign: "center" },
        }
    },
    {
        field: 'issueDescription', header: 'Description', tableConfig: {
            styleCss: { width: "25%", textAlign: "left" },
        }
    },
    {
        field: 'quantityIssues', header: 'Total Issues', tableConfig: {
            styleCss: { width: "15%", textAlign: "left" },
        }
    },
    {
        field: 'priceTotals', header: 'Total Price', tableConfig: {
            styleCss: { width: "15%", textAlign: "left" },
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
    },
    
];