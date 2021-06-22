import { makeAutoObservable } from "mobx";
import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { tableService } from "@services/TableService";
import { TableStore } from "./tableStore";
import { creatingStoreService } from "@services/CreatingStoreService";

export class ColumnStore {
    additionalTables: AdditionalTable[] = [];
    tableStore: TableStore;  
    tableTitleValue: string = "";
    
    constructor(tableStore: TableStore){
        this.tableStore = tableStore;
        creatingStoreService.initAdditionalTable(this.tableStore.tables,this.additionalTables);
        makeAutoObservable(this);
    }

    createTable = () => {
        creatingStoreService.createTable(this.additionalTables, this.tableTitleValue);
        this.tableTitleValue = "";
        this.tableStore.tables = tableService.save(this.additionalTables);
    }

    tableTitleValueOnChange = (value: string) => {
        this.tableTitleValue = value;
    }

    deleteTable = (tableId: string) => {
        this.additionalTables = this.additionalTables.filter(tab => tab.id !== tableId);
        this.tableStore.tables = tableService.save(this.additionalTables);
    }

    addColumn = (tableId: string) => {
        creatingStoreService.addColumn(this.additionalTables, tableId);
        this.tableStore.tables = tableService.save(this.additionalTables);
    }

    columnTypeValueChange = (value: DataType, tabId: string) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0].columnTypeValue = value;
        
        if(value.valueOf().toString() === DataType.Select.valueOf().toString()){
            this.additionalTables.filter(tab => tab.id === tabId)[0].selectMode = true;
        }else{
            this.additionalTables.filter(tab => tab.id === tabId)[0].selectMode = false;
        }
    }

    columnValueChange = (value: string, tabId: string) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0].columnValue = value;
    }

    deleteColumn = (tableId: string, columnId: string) => {
        creatingStoreService.deleteColumn(this.additionalTables, tableId, columnId);
        this.tableStore.tables = tableService.save(this.additionalTables);
    }

    editColumn = (tableId: string, columnId: string, value: string, type: DataType) => {
        creatingStoreService.editColumn(this.additionalTables, tableId, columnId, value, type);
    }

    saveEditedColumn = (tableId: string) => {
        creatingStoreService.saveEditedColumn(this.additionalTables, tableId);
        this.tableStore.tables = tableService.save(this.additionalTables);
    }

    addSelectField = (tabId: string) => {
        creatingStoreService.addSelectField(this.additionalTables, tabId);
    }

    selectValueChange = (value: string, tabId: string) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0].selectValue = value;
    }

    deleteSelectField = (tabId: string, index: number) => {
        this.additionalTables.filter(tab => tab.id === tabId)[0]
        .selectOptions.splice(index,1);
    }
}