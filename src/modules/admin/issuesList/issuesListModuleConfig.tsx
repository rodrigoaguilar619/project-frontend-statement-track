import { DataTablePropsI } from "lib-components-react/lib/@types/components/dataTable/dataTable";

export const columnsIssuesList: DataTablePropsI[] = [
    {
        field: 'id', header: 'Id', tableConfig: {
            styleCss: { width: "7%", textAlign: "center" },
        }
    },
    {
        field: 'initials', header: 'Initials', tableConfig: {
            styleCss: { width: "15%", textAlign: "center" },
        }
    },
    {
        field: 'description', header: 'Description', tableConfig: {
            styleCss: { width: "30%", textAlign: "left" },
        }
    },
    {
        field: 'descriptionCustom', header: 'Description Custom', tableConfig: {
            styleCss: { width: "30%", textAlign: "left" },
        }
    },
    
];