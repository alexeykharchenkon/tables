import { makeAutoObservable } from "mobx";
import { tableService } from "@services/TableService";
import { AdditionalTable } from "@app/common/models/AdditionalTable";

export class TableStore {
    tables: AdditionalTable[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    loadTables = () => { 
        this.tables = tableService.load(); 
    
    }
}