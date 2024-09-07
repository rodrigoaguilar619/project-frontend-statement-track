import { DataTablePropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const columnsIssueDividendsAccountList: DataTablePropsI[] = [
    {
        field: 'dateTransactionMillis', header: 'Date', tableConfig: {
            styleCss: { width: "33%", textAlign: "center" },
        },
        maskProps: {
            maskType: MaskDataTypeEnum.DATE,
            maskDataProps: {
                format: "DD/MM/yyyy HH:mm:ss"
            }
        }
    },
    {
        field: 'amount', header: 'Amount', tableConfig: {
            styleCss: { width: "33%", textAlign: "left" },
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
    {
        field: 'amountMxn', header: 'Amount (Mxn)', tableConfig: {
            styleCss: { width: "33%", textAlign: "left" },
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