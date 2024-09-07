import { ROUTE_ACCOUNT_STATEMENT_FILTER_GET, ROUTE_ACCOUNT_STATEMENT_LIST_GET, ROUTE_ACCOUNT_STATEMENT_RESUME_GET, ROUTE_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD, ROUTE_BROKER_ACCOUNT_LIST_GET, ROUTE_ISSUES_ACCOUNT_LIST_GET, ROUTE_ISSUES_LIST_GET } from '@app/catalogs/routesCatalog';
import { _APP_ENVIRONMENT_ } from 'lib-components-react/lib/catalogs/constantCatalog';
import { ComponentTypeEnum, EnvironmentEnum } from 'lib-components-react/lib/catalogs/enumCatalog';
import React from 'react';
const AccountStatementListModuleComponent = React.lazy(() => import('@app/modules/statement/accountStatementList/accountStatementListModuleComponent'));
const IssuesListComponent = React.lazy(() => import('@app/modules/admin/issuesList/issuesListModuleComponent'));
const BrokerAccountListComponent = React.lazy(() => import('@app/modules/broker/brokerAccountList/brokerAccountListModuleComponent'));
const IssuesAccountListComponent = React.lazy(() => import('@app/modules/broker/issuesAccountList/issuesAccountListModuleComponent'));
const AccountStatementFilterComponent = React.lazy(() => import('@app/modules/statement/accountStatementFilter/accountStatementFilterModuleComponent'));
const AccountStatementResumeModuleComponent = React.lazy(() => import('@app/modules/statement/accountStatementResume/accountStatementResumeModuleComponent'));
const AccountStatementFileLoadComponent = React.lazy(() => import('@app/modules/statement/accountStatementLoadFile/accountStatementLoadFileModuleComponent'));

const routesDev: any = [
]

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: ROUTE_ISSUES_LIST_GET, name: 'Issues List', element: () => <IssuesListComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_BROKER_ACCOUNT_LIST_GET, name: 'Broker Accounts', element: () => <BrokerAccountListComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_ACCOUNT_STATEMENT_LIST_GET, name: 'Account Statement', element: () => <AccountStatementListModuleComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_ISSUES_ACCOUNT_LIST_GET, name: 'Issues Accounts', element: () => <IssuesAccountListComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_ACCOUNT_STATEMENT_FILTER_GET, name: 'Account Statement Filter', element: () => <AccountStatementFilterComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_ACCOUNT_STATEMENT_RESUME_GET, name: 'Account Statement Resume', element: () => <AccountStatementResumeModuleComponent componentType={ComponentTypeEnum.MODULE} /> },
  { path: ROUTE_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD, name: 'Account Statement SnowBall File Load', element: () => <AccountStatementFileLoadComponent componentType={ComponentTypeEnum.MODULE} /> },
]

const finalRoutes = _APP_ENVIRONMENT_ === EnvironmentEnum.DEVELOPMENT ? [...routes, ...routesDev] : routes;

export default finalRoutes
