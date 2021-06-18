import { makeAutoObservable } from "mobx";
import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { tableService } from "@services/TableService";
import { TableStore } from "./tableStore";
import { workService } from "@services/WorkService";

export class ColumnStore {
    additionalTables: AdditionalTable[] = [];
    tableStore: TableStore;  
    tableTitleValue: string = "";
    
    constructor(tableStore: TableStore){
        this.tableStore = tableStore;
        workService.initAdditionalTable(this.tableStore.tables,this.additionalTables);
        makeAutoObservable(this)
    }

    createTable = () => {
        workService.createTable(this.additionalTables, this.tableTitleValue);
        tableService.save(this.tableStore.tables);
        this.tableTitleValue = "";    
        this.tableStore.tables =this.additionalTables;   
    }

    tableTitleValueOnChange = (value: string) => {
        this.tableTitleValue = value;
    }

    deleteTable = (tableId: string) => {
        this.additionalTables = this.additionalTables.filter(table => table.id !== tableId);
        this.tableStore.tables =this.additionalTables;
        tableService.save(this.tableStore.tables);
    }

    addColumn = (tableId: string) => {
        workService.addColumn(this.additionalTables, tableId);
        this.tableStore.tables = this.additionalTables;
        tableService.save(this.tableStore.tables);
    }

    columnTypeValueChange = (value: DataType, tabId: string) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0].columnTypeValue = value;
    }

    columnValueChange = (value: string, tabId: string) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0].columnValue = value;
    }

    deleteColumn = (tableId: string, columnId: string) => {
        this.additionalTables.filter(table => table.id === tableId)
        .forEach(table => { table.columns = table.columns.filter(column => column.id !== columnId);});
        
        this.tableStore.tables = this.additionalTables;
        tableService.save(this.tableStore.tables);
    }

    editColumn = (tableId: string, columnId: string, value: string, type: DataType) => {
        workService.editColumn(this.additionalTables, tableId, columnId, value, type);
    }

    saveEditedColumn = (tableId: string) => {
        workService.saveEditedColumn(this.additionalTables, tableId);
        this.tableStore.tables = this.additionalTables;
        tableService.save(this.tableStore.tables);
    }
}