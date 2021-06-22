import { Row } from "@common/models/Row";
import { TableModel } from "@common/models/TableModel"
import { Guid } from "guid-typescript";

const requests = {
    deleteRowById: (tables: TableModel[], tableId: string, id: string) => {
           tables.filter(table => table.id === tableId)
        .forEach(table => { table.rows = table.rows.filter(row => row.id !== id);})
    },
    getRowById: (tables: TableModel[], tableId: string, id: string) : any => {
        return tables.find(table => table.id === tableId)
            ?.rows.find(row => row.id === id);
    },
    saveRow:(tables: TableModel[], tableId: string, activeRow: Row) => {
        if(!requests.getRowById(tables, tableId, activeRow.id)){
            tables.find(table => table.id === tableId)?.rows
            .push({id: activeRow.id, cells: activeRow.cells,});
        }else{
            tables.find(table => table.id === tableId)?.rows
            .filter(row => row.id === activeRow.id)
            .forEach(row => {row.cells = activeRow.cells;});
        }
        activeRow = {id: "", cells: []};
    },
    getTableById:(tables: TableModel[], tableId: string): any => {
        return tables.find(table => table.id === tableId);
    },
    addRow:(tables: TableModel[], tableId: string, activeRow: Row) => {
        activeRow.id = Guid.create().toString();
        activeRow.cells = [];
        tables.find(table => table.id === tableId)?.columns
        .forEach(column => {
            activeRow.cells.push({
                id: Guid.create().toString(),
                type: column.type,
                value: "",
                selectOptions: column.selectOptions,
            });
        });
    },
}

export const fillingStoreService = {
    deleteRowById: (tables: TableModel[], tableId: string, id: string) => requests.deleteRowById(tables, tableId, id),
    getRowById: (tables: TableModel[], tableId: string, id: string) => requests.getRowById(tables, tableId, id),
    saveRow: (tables: TableModel[], tableId: string, activeRow: Row) => requests.saveRow(tables, tableId, activeRow),
    getTableById: (tables: TableModel[], tableId: string) => requests.getTableById(tables, tableId),
    addRow:(tables: TableModel[], tableId: string, activeRow: Row) => requests.addRow(tables, tableId, activeRow),
}
