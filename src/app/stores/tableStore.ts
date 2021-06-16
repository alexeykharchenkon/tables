import { makeAutoObservable } from "mobx";
import { Guid } from "guid-typescript";
import { TableModel } from "../common/models/TableModel";
import { tableService } from "../services/TableService";

export class TableStore {
    tables: TableModel[] = [];
    tableTitleValue: string = "";
    
    constructor(){
        makeAutoObservable(this);
    }

    createTable = () => {
        this.tables.unshift({
            id: Guid.create().toString(), 
            title: Boolean(this.tableTitleValue) ? this.tableTitleValue : "Table " + (this.tables.length + 1).toString(), 
            columns: [],
            rows: [], 
        });

        this.tableTitleValue = "";    

        tableService.save(this.tables);
    }

    tableTitleValueOnChange = (value: string) => {
        this.tableTitleValue = value;
    }

    deleteTable = (tableId: string) => {
        this.tables = this.tables.filter(table => table.id !== tableId);
        tableService.save(this.tables);
    }

    loadTables = () => { this.tables = tableService.load(); }
}