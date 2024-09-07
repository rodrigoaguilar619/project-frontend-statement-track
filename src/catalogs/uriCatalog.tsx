import { _APP_URL_CONTEXT_PATH_ } from "lib-components-react/lib/catalogs/constantCatalog";

const _URL_API_MAIN_ = _APP_URL_CONTEXT_PATH_;
export const URL_CATALOG_DATA_LIST_GET = _URL_API_MAIN_ + "api/admin/catalog/getCatalog";
export const URL_ISSUES_LIST_GET = _URL_API_MAIN_ + "api/admin/customCatalog/catalogIssue/getCatalogIssues";
export const URL_ISSUES_DATA_INDIVIDUAL_GET = _URL_API_MAIN_ + "api/admin/customCatalog/catalogIssue/getCatalogIssue";
export const URL_ISSUES_DATA_INDIVIDUAL_UPDATE = _URL_API_MAIN_ + "api/admin/customCatalog/catalogIssue/updateCatalogIssue";
export const URL_ISSUES_DATA_INDIVIDUAL_ADD = _URL_API_MAIN_ + "api/admin/customCatalog/catalogIssue/saveCatalogIssue";
export const URL_ISSUES_BUY_GET = _URL_API_MAIN_ + "api/issues/getIssuesBuy";
export const URL_BROKER_ACCOUNT_LIST_GET = _URL_API_MAIN_ + "api/broker/getBrokerAccounts";
export const URL_BROKER_DATE_STATEMENTS = _URL_API_MAIN_ + "api/broker/getDateStatements";
export const URL_ACCOUNT_STATEMENT_GET = _URL_API_MAIN_ + "api/accountStatement/getAccountStatement";
export const URL_ISSUE_DIVIDENDS_ACCOUNT_LIST = _URL_API_MAIN_ + "api/account/issues/getMovementsDividend";
export const URL_ACCOUNT_RESUME_GET = _URL_API_MAIN_ + "api/account/getAccountResume";
export const URL_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD = _URL_API_MAIN_ + "api/readStatement/readStatementSnowBall";

export const PATH_API_DOCUMENTATION = _URL_API_MAIN_ + "swagger-ui/index.html";