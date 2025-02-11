import { ROUTE_ACCOUNT_STATEMENT_FILTER_GET, ROUTE_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD, ROUTE_BROKER_ACCOUNT_LIST_GET, ROUTE_ISSUES_LIST_GET } from '@app/catalogs/routesCatalog'
import { AppMenusPropsDataI } from 'lib-components-react/lib/@types/components/layout/appMenuLayout'
import { ROUTE_LOGOUT } from 'lib-components-react/lib/catalogs/routesCatalog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faExternalLink, faFile, faFilter, faList, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { PATH_API_DOCUMENTATION } from '@app/catalogs/uriCatalog';

const _nav: AppMenusPropsDataI[] = [
    {
      text: 'Issues Catalog',
      url: ROUTE_ISSUES_LIST_GET,
      icon: <FontAwesomeIcon icon={faList} className="nav-icon menu-icon" />,
    },
    {
      text: 'Broker Accounts',
      url: ROUTE_BROKER_ACCOUNT_LIST_GET,
      icon: <FontAwesomeIcon icon={faBuilding} className="nav-icon menu-icon" />,
    },
    {
      text: 'Broker Accounts Filter',
      url: ROUTE_ACCOUNT_STATEMENT_FILTER_GET,
      icon: <FontAwesomeIcon icon={faFilter} className="nav-icon menu-icon" />,
    },
    {
      text: 'Account Statement',
      url: ROUTE_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD,
      icon: <FontAwesomeIcon icon={faFile} className="nav-icon menu-icon" />,
    },
    {
      text: 'Documentation API',
      url: PATH_API_DOCUMENTATION,
      icon: <FontAwesomeIcon icon={faExternalLink} className="nav-icon menu-icon" />,
      isOpenExternal: true
    },
    {
      text: 'Logout',
      url: ROUTE_LOGOUT,
      icon: <FontAwesomeIcon icon={faRightFromBracket} className="nav-icon menu-icon" />
    }
];

export default _nav;
