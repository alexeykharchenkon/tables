import { makeAutoObservable } from "mobx";
import { tableService } from "@common/services/TableService";
import { AdditionalTable } from "@common/models/AdditionalTable";
import { dbService } from "@common/services/DBService";
import { TableSchema } from "@common/models/TableSchema";
import { Column } from "@common/models/Column";

export class TableStore {
    tableSchemas: TableSchema[] = [];
    columns: Column[] = [];

    tables: AdditionalTable[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    loadTables = () => { 
        this.tables = tableService.load(); 
    }

    loadData = () => { 
        dbService.LoadSchemas(this.tableSchemas);
        dbService.LoadColumns(this.columns);
    }
}