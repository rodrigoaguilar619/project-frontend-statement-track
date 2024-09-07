import { CATALOG_DEFAULT_MONTH } from "@app/catalogs/dataCatalog";

export function getYears() {

    let yearStart = 2020;
    let yearEnd = new Date().getFullYear();

    let years = [];

    for(let currentYear = yearStart; currentYear <= yearEnd; currentYear++ ) {

        years.push({ id: currentYear + "", description: currentYear + "" });
    }

    return years;
}

export function getMonthName(idMonth: number) {

    let result = "";

    CATALOG_DEFAULT_MONTH.forEach(( monthObject ) => {

        if (monthObject.id == (idMonth + ""))
            result = monthObject.description;
    });

    return result;
}