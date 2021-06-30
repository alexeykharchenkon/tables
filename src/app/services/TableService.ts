import { AdditionalTable } from "@app/common/models/AdditionalTable";
import { TableModel } from "@common/models/TableModel"

const requests = {
    load: () : any => {
        const tables: TableModel [] = JSON.parse(localStorage.getItem("tables") || "[]")
        const additionalTables: AdditionalTable[] = [];
        tables.forEach(table => {
            additionalTables.push({
                id: table.id,
                title: table.title,
                columns: table.columns,
                tablesData: table.tablesData,
                columnTypeValue: "",
                columnValue: "",
                editMode: false,
                columnId: "",
                selectMode: false,
                textMode: false,
                dateMode: false,
                numberMode: false,
                selectOptions: [],
                selectTypeValue: "0",
                forbiddenSymbols: "",
                multySelectMode: false,
                dateFormat: "dd/MM/yyyy",
                selectValue: "",
                fillingMode: false,
                addEditRowMode: false,
                activeRow: {id: "", cells: []},
                isRequired: false,
                maxLength: 10000,
                maxItemsSelected: 10000,
                minValue: -10000,
                maxValue: 10000,
            });
        });

        return additionalTables;
    },
    save: (additionalTables: AdditionalTable[]) => {
        const tablesToSave: TableModel [] = [];

        additionalTables.forEach(table => {
            tablesToSave.push({
                id: table.id,
                title: table.title,
                columns: table.columns,
                tablesData: table.tablesData,
            });
        });

        localStorage.setItem("tables", JSON.stringify(tablesToSave));
    },
}

export const tableService = {
    load: () : any => requests.load(),
    save: (additionalTables: AdditionalTable[]) => requests.save(additionalTables),
}