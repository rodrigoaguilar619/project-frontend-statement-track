import { HttpMethodEnum, OptionAddEditEnum } from "lib-components-react/lib/catalogs/enumCatalog";
import { generateDebugClassService } from "lib-components-react/lib/utils/webUtils/debugUtil";
import { manageCallApiAuthPromise } from "lib-components-react/lib/utils/webUtils/httpManagerUtil";
import { URL_ISSUES_DATA_INDIVIDUAL_ADD, URL_ISSUES_DATA_INDIVIDUAL_GET, URL_ISSUES_DATA_INDIVIDUAL_UPDATE, URL_ISSUES_LIST_GET } from "@app/catalogs/uriCatalog";

export function getIssuesListService() {

    let debugClass = generateDebugClassService("Get Issues list");

    let params = {};
    let url = URL_ISSUES_LIST_GET;
    
    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function getIssueByIdService(id: number) {

    let debugClass = generateDebugClassService("Get Issue data by id");

    let url = URL_ISSUES_DATA_INDIVIDUAL_GET;
    let params = {id: id};

    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}

export function addEditIssueService(optionAddEdit: OptionAddEditEnum, issueData: Record<string, any>) {

    let debugClass = generateDebugClassService("Add Issue");

    let url = optionAddEdit === OptionAddEditEnum.EDIT ? URL_ISSUES_DATA_INDIVIDUAL_UPDATE : URL_ISSUES_DATA_INDIVIDUAL_ADD;
    let params = {catalogData: issueData};

    return manageCallApiAuthPromise(debugClass, url, params, {}, HttpMethodEnum.POST);
}