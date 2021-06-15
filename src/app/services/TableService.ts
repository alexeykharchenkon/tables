import { TableModel } from "../common/models/TableModel"

const requests = {
    get: () => JSON.parse(localStorage.getItem("tables") || "[]"),
    set: (tables: TableModel[]) => localStorage.setItem("tables", JSON.stringify(tables)),
}

export const tableService = {
    load: () => requests.get(),
    save: (tables: TableModel[]) => requests.set(tables)
}