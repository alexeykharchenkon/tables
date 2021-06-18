import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
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
            });
        });
    },
    initAdditionalTable: (tables: TableModel[], additionalTables: AdditionalTable[]) => {
        tables.forEach(table => {
            additionalTables.push({
                id: table.id,
                title: table.title,
                columns: table.columns,
                rows: table.rows,
                columnTypeValue: DataType.Text,
                columnValue: "",
                editMode: false,
                columnId: "",
            });
        })
    },
    createTable: (additionalTables: AdditionalTable[], tableTitleValue: string) => {
        additionalTables.unshift({
            id: Guid.create().toString(), 
            title: Boolean(tableTitleValue) ? tableTitleValue : "Table " + (additionalTables.length + 1).toString(), 
            columns: [],
            rows: [], 
            columnTypeValue: DataType.Text,
            columnValue: "",
            editMode: false,
            columnId: "",
        });
    },
    addColumn: (additionalTables: AdditionalTable[], tableId: string) => {
        additionalTables.filter(table => table.id === tableId)
        .forEach(table=> { 
            if(table.columns.length < 10){
                table.columns.push({
                    id: Guid.create().toString(),
                    label: Boolean(table.columnValue) ? table.columnValue : "Column " + (table.columns.length + 1).toString(),
                    type: table.columnTypeValue,
                });
            }
            table.columnTypeValue = DataType.Text;
            table.columnValue = "";
        });
    },
    editColumn: (additionalTables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType) => {
        additionalTables.filter(table => table.id === tableId)
        .forEach(table => { 
            table.editMode = true;
            table.columnValue = value;
            table.columnId = columnId;
            table.columnTypeValue = type;
        });
    },
    saveEditedColumn: (additionalTables: AdditionalTable[], tableId: string) => {
        additionalTables.filter(table => table.id === tableId)
        .forEach(table=> { 
            table.columns.filter(col => col.id === table.columnId)
             .forEach (col => { 
                 col.label = table.columnValue; 
                 col.type = table.columnTypeValue;
                });
            table.editMode = false;
            table.columnValue = "";
            table.columnId = "";
            table.columnTypeValue = DataType.Text;
        });
    },
}

export const workService = {
    deleteRowById: (tables: TableModel[], tableId: string, id: string) => requests.deleteRowById(tables, tableId, id),
    getRowById: (tables: TableModel[], tableId: string, id: string) => requests.getRowById(tables, tableId, id),
    saveRow: (tables: TableModel[], tableId: string, activeRow: Row) => requests.saveRow(tables, tableId, activeRow),
    getTableById: (tables: TableModel[], tableId: string) => requests.getTableById(tables, tableId),
    addRow:(tables: TableModel[], tableId: string, activeRow: Row) => requests.addRow(tables, tableId, activeRow),
    initAdditionalTable: (tables: TableModel[], additionalTables: AdditionalTable[]) => requests.initAdditionalTable(tables, additionalTables),
    createTable: (additionalTables: AdditionalTable[], tableTitleValue: string) => requests.createTable(additionalTables, tableTitleValue),
    addColumn: (additionalTables: AdditionalTable[], tableId: string)=> requests.addColumn(additionalTables, tableId),
    editColumn: (additionalTables: AdditionalTable[], tableId: string, columnId: string, value: string, type: DataType)=>requests.editColumn(additionalTables, tableId, columnId, value, type),
    saveEditedColumn: (additionalTables: AdditionalTable[], tableId: string) => requests.saveEditedColumn(additionalTables, tableId),
}
