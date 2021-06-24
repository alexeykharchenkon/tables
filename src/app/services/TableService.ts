import { AdditionalTable } from "@app/common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
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
                columnTypeValue: DataType.Text,
                columnValue: "",
                editMode: false,
                columnId: "",
                selectMode: false,
                textMode: true,
                dateMode: false,
                selectOptions: [],
                selectTypeValue: "0",
                forbiddenSymbols: "",
                multySelectMode: false,
                dateFormat: "",
                selectValue: "",
                fillingMode: false,
                addEditRowMode: false,
                activeRow: {id: "", cells: []},
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