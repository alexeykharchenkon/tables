import { Guid } from "guid-typescript";
import { makeAutoObservable } from "mobx";
import { DataType } from "../common/models/DataType";
import { TableStore } from "./tableStore";

export class ColumnStore {
    tableStore: TableStore;
    columnTypeValue: DataType = DataType.Text;
    columnValue: string = "";
    editMode: boolean = false;
    columnId: string = "";
    
    constructor(tableStore: TableStore){
        this.tableStore = tableStore;
        makeAutoObservable(this)
    }

    addColumn = (tableId: string) => {
        this.tableStore.tables.filter(table => table.id === tableId)
        .forEach(table=> { 
            if(table.columns.length < 10)
                table.columns.push({
                    id: Guid.create().toString(),
                    label: Boolean(this.columnValue) ? this.columnValue : "Column " + (table.columns.length + 1).toString(),
                    type: this.columnTypeValue,
                });
        })

        this.columnTypeValue = DataType.Text;
        this.columnValue = "";
    }

    columnTypeValueChange = (value: DataType) => {
        this.columnTypeValue = value;
    }

    columnValueChange = (value: string) => {
        this.columnValue = value;
    }

    deleteColumn = (tableId: string, columnId: string) => {
        this.tableStore.tables.filter(table => table.id === tableId)
        .forEach(table => { table.columns = table.columns.filter(column => column.id !== columnId);})
    }

    editColumn = (tableId: string, columnId: string, value: string, type: DataType) => {
        this.editMode = true;
        this.columnValue = value;
        this.columnId = columnId;
        this.columnTypeValue = type;
    }

    saveEditedColumn = (tableId: string) => {
        this.tableStore.tables.filter(table => table.id === tableId)
        .forEach(table=> { 
            table.columns.filter(col => col.id === this.columnId)
             .forEach (col => { 
                 col.label = this.columnValue; 
                 col.type = this.columnTypeValue;
                });
        });
        this.editMode = false;
        this.columnValue = "";
        this.columnTypeValue = DataType.Text;
    }
}