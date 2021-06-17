import { makeAutoObservable } from "mobx";
import { TableModel } from "@common/models/TableModel";
import { tableService } from "@services/TableService";

export class TableStore {
    tables: TableModel[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    loadTables = () => { this.tables = tableService.load(); }
}