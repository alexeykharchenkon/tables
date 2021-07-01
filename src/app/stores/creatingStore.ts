import { makeAutoObservable } from "mobx";
import { tableService } from "@services/TableService";
import { TableStore } from "./tableStore";
import { creatingStoreService } from "@services/CreatingStoreService";
import { fillingStoreService } from "@services/FillingStoreService";

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

    deleteTable = (tableId: string) => {
        this.tableStore.tables = this.tableStore.tables.filter(tab => tab.id !== tableId);
        tableService.save(this.tableStore.tables);
    }

    addColumn = (tableId: string) => {
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
        creatingStoreService.addColumn(this.tableStore.tables, tableId);
        tableService.save(this.tableStore.tables);
    }

    deleteColumn = (tableId: string, columnId: string) => {
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
        creatingStoreService.deleteColumn(this.tableStore.tables, tableId, columnId);
        tableService.save(this.tableStore.tables);
    }

    editColumn = (tableId: string, columnId: string, value: string, type: string, selectType: boolean) => {
        creatingStoreService.editColumn(this.tableStore.tables, tableId, columnId, value, type, selectType);
    }

    saveEditedColumn = (tableId: string) => {
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
        creatingStoreService.saveEditedColumn(this.tableStore.tables, tableId);
        tableService.save(this.tableStore.tables);
    }

    addSelectField = (tabId: string) => {
        creatingStoreService.addSelectField(this.tableStore.tables, tabId);
    }

    deleteSelectField = (tabId: string, index: number) => {
        this.tableStore.tables.filter(tab => tab.id === tabId)
        .forEach(tab => {
            tab.selectOptions = tab.selectOptions.filter((x, i) => i !== index);
        });  
    }

     OnValueChange = (value: any, tabId: string, changeType: string) => {
         switch(changeType){
             case "ISREQUIREDCHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].isRequired = value.target.checked;
                break;
             case "FORRBIDDENCHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].forbiddenSymbols = value.target.value;
                break;
            case "DATEFORMATCHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].dateFormat = value.target.value;
                break;
            case "SELECTMODECHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].selectTypeValue = value.target.value;
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].multySelectMode = value.target.value === "1" ? true : false;        
                break;
           case "SELECTVALUECHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].selectValue = value.target.value;
                break;
            case "COLUMNVALUECHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].columnValue = value.target.value;
                break;
            case "COLUMNTYPEVALUECHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].columnTypeValue = value.target.value;
                creatingStoreService.switchSelectMode(this.tableStore.tables, tabId, value.target.value);
                break;
            case "TITLECHANGE":
                this.tableTitleValue = value.target.value;
                break;
            case "MAXLENGTHCHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].maxLength = value.target.value;
                break;
            case "MAXVALUECHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].maxValue = value.target.value;
                break;
            case "MINVALUECHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].minValue = value.target.value;
                break;
            case "MAXITEMSELECTEDCHANGE":
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].maxItemsSelected = value.target.value;
                break;
         } 
     }
}