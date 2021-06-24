import { makeAutoObservable } from "mobx";
import { DataType } from "@common/models/DataType";
import { tableService } from "@services/TableService";
import { TableStore } from "./tableStore";
import { creatingStoreService } from "@services/CreatingStoreService";

export class ColumnStore {
    tableStore: TableStore;  
    tableTitleValue: string = "";
    
    constructor(tableStore: TableStore){
        makeAutoObservable(this);
        this.tableStore = tableStore;
    }

    createTable = () => {
        creatingStoreService.createTable(this.tableStore.tables, this.tableTitleValue);
        this.tableTitleValue = "";
        tableService.save(this.tableStore.tables);
    }

    tableTitleValueOnChange = (value: string) => {
        this.tableTitleValue = value;
    }

    deleteTable = (tableId: string) => {
        this.tableStore.tables = this.tableStore.tables.filter(tab => tab.id !== tableId);
        tableService.save(this.tableStore.tables);
    }

    addColumn = (tableId: string) => {
        creatingStoreService.addColumn(this.tableStore.tables, tableId);
        tableService.save(this.tableStore.tables);
    }

    columnTypeValueChange = (value: DataType, tabId: string) => {
        this.tableStore.tables.filter(tab => tab.id === tabId)[0].columnTypeValue = value;
        
        if(value.valueOf().toString() === DataType.Select.valueOf().toString()){
            this.tableStore.tables.filter(tab => tab.id === tabId)[0].selectMode = true;
        }else{
            this.tableStore.tables.filter(tab => tab.id === tabId)[0].selectMode = false;
        }
    }

    columnValueChange = (value: string, tabId: string) => {
        this.tableStore.tables.filter(tab => tab.id === tabId)[0].columnValue = value;
    }

    deleteColumn = (tableId: string, columnId: string) => {
        creatingStoreService.deleteColumn(this.tableStore.tables, tableId, columnId);
        tableService.save(this.tableStore.tables);
    }

    editColumn = (tableId: string, columnId: string, value: string, type: DataType) => {
        creatingStoreService.editColumn(this.tableStore.tables, tableId, columnId, value, type);
    }

    saveEditedColumn = (tableId: string) => {
        creatingStoreService.saveEditedColumn(this.tableStore.tables, tableId);
        tableService.save(this.tableStore.tables);
    }

    addSelectField = (tabId: string) => {
        creatingStoreService.addSelectField(this.tableStore.tables, tabId);
    }

    selectValueChange = (value: string, tabId: string) => {
        this.tableStore.tables.filter(tab => tab.id === tabId)[0].selectValue = value;
    }

    deleteSelectField = (tabId: string, index: number) => {
        this.tableStore.tables.filter(tab => tab.id === tabId)[0]
        .selectOptions.splice(index,1);
    }
}