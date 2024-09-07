import { ROUTE_ACCOUNT_STATEMENT_FILTER_GET, ROUTE_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD, ROUTE_BROKER_ACCOUNT_LIST_GET, ROUTE_ISSUES_LIST_GET } from '@app/catalogs/routesCatalog'
import {
  cilBuilding,
  cilFile,
  cilList
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavTitle } from '@coreui/react'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const _nav = [
  {
    component: CNavTitle,
    name: 'Modules',
  },
  {
    component: CNavItem,
    name: 'Issues Catalog',
    to: ROUTE_ISSUES_LIST_GET,
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Broker Accounts',
    to: ROUTE_BROKER_ACCOUNT_LIST_GET,
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Broker Accounts Filter',
    to: ROUTE_ACCOUNT_STATEMENT_FILTER_GET,
    icon: <FontAwesomeIcon icon={faFilter} className='nav-icon' />,
  },
  {
    component: CNavItem,
    name: 'Account Statement',
    to: ROUTE_ACCOUNT_STATEMENT_SNOWBALL_FILE_LOAD,
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  }
]

export default _nav
