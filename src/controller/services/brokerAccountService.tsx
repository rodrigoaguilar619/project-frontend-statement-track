import { HttpMethodEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import { generateDebugClassService } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageCallApiAuthPromise } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { URL_BROKER_ACCOUNT_LIST_GET, URL_ISSUE_DIVIDENDS_ACCOUNT_LIST, URL_ISSUES_BUY_GET } from "@app/catalogs/uriCatalog";

export function getBrokerAccountListService() {

    let debugClass = generateDebugClassService("Get broker account list");

    let params = {};
    let url = URL_BROKER_ACCOUNT_LIST_GET;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function getIssuesAccountListService(idBrokerAccount: number) {

    let debugClass = generateDebugClassService("Get issues account list");

    let params = { idBrokerAccount:idBrokerAccount };
    let url = URL_ISSUES_BUY_GET;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function getIssueDividendsAccountListService(idBrokerAccount: number, idIssue: number) {

    let debugClass = generateDebugClassService("Get issues account list");

    let params = { idBrokerAccount: idBrokerAccount, idIssue: idIssue };
    let url = URL_ISSUE_DIVIDENDS_ACCOUNT_LIST;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}