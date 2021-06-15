import { makeAutoObservable } from "mobx";
import { TableModel } from "../common/models/TableModel";
import { TableStore } from "./tableStore";

export class FillingStore {
    tableStore: TableStore;
    fillingTable: TableModel = {id: "", title: "", columns: [], cells: []};
    fillingMode: boolean = false;
    
    constructor(tableStore: TableStore){
        this.tableStore = tableStore;
        makeAutoObservable(this)
    }

    chooseTable = (tableId: string) => {
        this.fillingTable = this.tableStore.tables.filter(table => table.id === tableId)[0];
        this.fillingMode = true;
    }

    addRow = (tableId: string) => {

    }
}