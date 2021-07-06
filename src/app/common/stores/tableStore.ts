import { makeAutoObservable } from "mobx";
import { tableService } from "@common/services/TableService";
import { AdditionalTable } from "@common/models/AdditionalTable";

export class TableStore {
    tables: AdditionalTable[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    loadTables = () => { 
        this.tables = tableService.load(); 
    
    }
}