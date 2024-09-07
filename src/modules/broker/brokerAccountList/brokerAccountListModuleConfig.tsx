import { DataTablePropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";

export const columnsBrokerAccountList: DataTablePropsI[] = [
    {
        field: 'id', header: 'Id', tableConfig: {
            styleCss: { width: "7%", textAlign: "center" },
        }
    },
    {
        field: 'brokerDescription', header: 'Broker', tableConfig: {
            styleCss: { width: "15%", textAlign: "left" },
        }
    },
    {
        field: 'accountDescription', header: 'Account', tableConfig: {
            styleCss: { width: "30%", textAlign: "left" },
        }
    },
    {
        field: 'cutDay', header: 'Cut Day', tableConfig: {
            styleCss: { width: "30%", textAlign: "left" },
        }
    },
    
];