import { makeAutoObservable } from "mobx";
import { Row } from "@common/models/Row";
import { TableModel } from "@common/models/TableModel";
import { tableService } from "@services/TableService";
import { TableStore } from "./tableStore";
import { fillingStoreService } from "@services/FillingStoreService";

export class FillingStore {
    tableStore: TableStore;
    fillingMode: boolean = false;
    addEditRowMode: boolean = false;
    fillingTable: TableModel = {id: "", title: "", columns: [], rows: []};
    activeRow: Row = {id: "", cells: []};
    
    constructor(tableStore: TableStore){
        this.tableStore = tableStore;
        makeAutoObservable(this);
    }

    chooseTable = (tableId: string) => {
        this.fillingTable = fillingStoreService.getTableById(this.tableStore.tables, tableId); 
        this.fillingMode = true;
        this.addEditRowMode = false;
    }

    addRow = (tableId: string) => {
        fillingStoreService.addRow(this.tableStore.tables, tableId, this.activeRow);
        this.addEditRowMode = true;
    }

    saveRow = (tableId: string) => {
        fillingStoreService.saveRow(this.tableStore.tables, tableId, this.activeRow);
        this.tableStore.tables = tableService.save(this.tableStore.tables);
        this.addEditRowMode = false;
    }

    cellValueChange = (value: string, cellId: string) => {
        this.activeRow.cells.filter(cell => cell.id === cellId)
        .forEach(cell => {cell.value = value;})
    }

    editRow = (tableId: string, rowId: string) => {
        this.addEditRowMode = true;
        this.activeRow = fillingStoreService.getRowById(this.tableStore.tables, tableId, rowId);   
    }

    deleteRow = (tableId: string, rowId: string) => {
        fillingStoreService.deleteRowById(this.tableStore.tables, tableId, rowId);
        this.tableStore.tables = tableService.save(this.tableStore.tables);
    }

    selectValueChange = (value: string, cellId: string) => {
        this.activeRow.cells.filter(cell => cell.id === cellId)
        .forEach(cell => {cell.value = value;})
    }

}