import { AdditionalTable } from "@app/common/models/AdditionalTable";
import { TableModel } from "@common/models/TableModel"

const requests = {
    get: () => JSON.parse(localStorage.getItem("tables") || "[]"),
    set: (additionalTables: AdditionalTable[] | TableModel[]) : any => {
        const tablesToSave: TableModel [] = [];

        additionalTables.forEach(table => {
            tablesToSave.push({
                id: table.id,
                title: table.title,
                columns: table.columns,
                rows: table.rows,
            });
        })

        localStorage.setItem("tables", JSON.stringify(tablesToSave));

        return tablesToSave;
    },
}

export const tableService = {
    load: () => requests.get(),
    save: (additionalTables: AdditionalTable[] | TableModel[]): any => requests.set(additionalTables),
}