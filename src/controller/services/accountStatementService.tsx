import { HttpMethodEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import { generateDebugClassService } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageCallApiAuthPromise } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { URL_ACCOUNT_RESUME_GET, URL_ACCOUNT_STATEMENT_GET, URL_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD, URL_BROKER_DATE_STATEMENTS } from "@app/catalogs/uriCatalog";

export function getAccountStatementService(idBrokerAccount: number, year: number, month: number) {

    let debugClass = generateDebugClassService("Get account statement");

    let params = { idAccountBroker: idBrokerAccount, year: year, month: month };
    let url = URL_ACCOUNT_STATEMENT_GET;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}


export function getDateStatementsService(idBrokerAccount: number) {

    let debugClass = generateDebugClassService("Get account statement");

    let params = { idBrokerAccount: idBrokerAccount };
    let url = URL_BROKER_DATE_STATEMENTS;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function getAccountStatementResumeService(idBrokerAccount: number, filters: Record<string, any>) {

    let debugClass = generateDebugClassService("Get account statement resume");

    let params = { idBrokerAccount: idBrokerAccount, filters: filters };
    let url = URL_ACCOUNT_RESUME_GET;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function loadAccountStatementFileService(formData: Record<string, any>) {

    let debugClass = generateDebugClassService("Load Account Statement list");

    let params = {...formData};
    let url = URL_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD;
    
    return manageCallApiAuthPromise(debugClass, url, params, { headers: { 'content-type': 'multipart/form-data'} }, HttpMethodEnum.POST);
}