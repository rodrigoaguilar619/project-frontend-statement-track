import { HttpMethodEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import { generateDebugClassService } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageAxiosCallApiAuthPromise } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { URL_AFORE_PERIOD_STATEMENT_GET, URL_AFORE_PERIODS_RESUME_STATEMENT_GET } from "@app/catalogs/uriCatalog";

export function getAforePeriodsResumeStatementService() {

    let debugClass = generateDebugClassService("Get afore period resume statement");

    let params = { };
    let url = URL_AFORE_PERIODS_RESUME_STATEMENT_GET;
    
    return manageAxiosCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function getAforePeriodResumeStatementService(datePeriod: any) {

    let debugClass = generateDebugClassService("Get afore period resume statement");

    let params = { datePeriod: datePeriod };
    let url = URL_AFORE_PERIOD_STATEMENT_GET;
    
    return manageAxiosCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}
