import { MaskDataTypeEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import { maskData } from "lib-components-react/lib/utils/dataUtils/maskDataUtil";

export const maskAmount = (value: number) => {
    return maskData(value, { maskType: MaskDataTypeEnum.CURRENCY, maskDataProps: { decimalPlaces: 2, addSymbolCurrency: true, addSeparateComma: true } });
}

export const maskYield = (value: number) => {
    return maskData(value, { maskType: MaskDataTypeEnum.CURRENCY, maskDataProps: { decimalPlaces: 2, addSymbolPercent: true } });
}

export const maskDate = (value: number) => {
    return maskData(value, { 
            maskType: MaskDataTypeEnum.DATE, maskDataProps: {
            format: "DD/MM/yyyy"
        }
    });
}