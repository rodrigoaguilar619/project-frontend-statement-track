import { DataTablePropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";
import { MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";

export const columnsAccountStatementTransactionList: DataTablePropsI[] = [
    {
        field: 'date', header: 'Date', tableConfig: {
            styleCss: { width: "15%", textAlign: "center" },
        },
        maskProps: {
            maskType: MaskDataTypeEnum.DATE,
            maskDataProps: {
                format: "DD/MM/yyyy HH:mm:ss"
            }
        }
    },
    {field: 'typeOperationDescription', header: 'Operation', tableConfig: {
        styleCss: { width: "25%", textAlign: "center" },
    }},
    {
        field: 'amount', header: 'Amount', tableConfig: {
            styleCss: { width: "15%", textAlign: "right" },
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
        field: 'charge', header: 'Charge', tableConfig: {
            styleCss: { width: "15%", textAlign: "right" },
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
        field: 'income', header: 'Income', tableConfig: {
            styleCss: { width: "15%", textAlign: "right" },
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
        field: 'balance', header: 'Balance', tableConfig: {
            styleCss: { width: "15%", textAlign: "right" },
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