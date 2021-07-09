import { makeAutoObservable } from "mobx";
import { dbService } from "@common/services/DBService";
import { TableSchema } from "@common/models/TableSchema";
import { Column } from "@common/models/Column";
import { DataTable } from "@common/models/DataTable";
import { Cell} from "@common/models/Cell";
import { Row } from "@common/models/Row";

export class TableStore {
    tableSchemas: TableSchema[] = [];
    columns: Column[] = [];
    dataTables: DataTable[] = [];
    cells: Cell[] = [];
    rows: Row[] = [];
    
    constructor(){
        makeAutoObservable(this);
    }

    loadData = () => { 
        dbService.LoadSchemas(this.tableSchemas);
        dbService.LoadColumns(this.columns);
        dbService.LoadDataTables(this.dataTables);
        dbService.LoadRows(this.rows);
        dbService.LoadCells(this.cells);
    }
}