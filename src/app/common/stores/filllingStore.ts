import { makeAutoObservable} from "mobx";
import { tableService } from "@common/services/TableService";
import { TableStore } from "./tableStore";
import { fillingStoreService } from "@common/services/FillingStoreService";
import { Cell } from "@common/models/Cell";
import { formatService } from "@common/services/FormatService";
import { Types } from "@common/models/Types";
import { dbService } from "@common/services/DBService";
import { Guid } from "guid-typescript";
import { Row } from "@common/models/Row";

export class FillingStore {
    tableStore: TableStore;
    titleValue: string = "";
    activeSchemaId: string = ""; 
    activeTableId: string = "";
    addEditRowMode: boolean = false;
    activeRow: Row = {id: "", tableId: ""};
    activeCells: Cell[] = [];
    
    
    constructor(tableStore: TableStore){
        makeAutoObservable(this);
        this.tableStore = tableStore;
    }

    chooseTableSchema = (id: string) => {
        this.activeSchemaId = id;
        this.activeTableId = "";
        this.addEditRowMode = false;
    }
    chooseTable = (id: string) => {
        this.activeTableId = id;
    }

    addDeleteTable = (action: string) => {
        switch(action){
            case Types[Types.ADDTABLE]:
                this.activeTableId = Guid.create().toString();
                this.tableStore.dataTables.push({id: this.activeTableId, title: this.titleValue, schemaId: this.activeSchemaId});
                dbService.CreateDataTable(this.activeTableId, this.titleValue, this.activeSchemaId);
                this.titleValue = "";
                break;
            case Types[Types.DELETETABLE]:
                this.tableStore.dataTables = this.tableStore.dataTables.filter(tab => tab.id !== this.activeTableId);
                dbService.DeleteDataTable(this.activeTableId);
                this.activeTableId= "";
                break;
        }
    }

    crudRow = (rowId: string, action: string) => {
        switch(action){
           case Types[Types.ADDROW]:
                this.addEditRowMode = true;
                break;
            case Types[Types.EDITROW]:
                
                break;
            case Types[Types.DELETEROW]:
                
                break;
            case Types[Types.SAVEROW]:
                
                break;
            case Types[Types.CANCELADDROW]:
                    
                break;
        }
    }

    saveRow = (tableId: string, tableDataId: string) => {
        fillingStoreService.saveRow(this.tableStore.tables, tableId, tableDataId);
        tableService.save(this.tableStore.tables);
    }

   cancelAddRow = (tableId: string) => {
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
   }

    onValueChange = (value: any, tabId: string, tableDataId: string, 
        rowId: string, cellId: string, cellType: string, changeType: string) => {
        switch(changeType){
         /*   case Types[Types.DATECHANGE]:
                this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
                    table.activeRow.cells.filter(cell => cell.id === cellId)
                        .forEach(cell => {cell.value = value;});
                    table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== "");
                }); 
               break;*/
           /* case Types[Types.CHECKBOXCHANGE]:
                this.tableStore.tables.filter(table => table.id === tabId)
                .forEach(table => {
                    table.tablesData
                    .filter(tabData => tabData.id === tableDataId)
                        .forEach(tabData => {
                            tabData.rows.filter(row => row.id === rowId)   
                            .forEach(row => {
                                row.cells.filter(cel => cel.id === cellId)
                                    .forEach(cel => {cel.value = value;});
                            });
                        tabData.rows = tabData.rows.filter(row => row.id !== "");
                    });
                }); 

                tableService.save(this.tableStore.tables);
               break;*/
           case Types[Types.TITLECHANGE]:
               this.titleValue = value.target.value;
               break;
        /*   case Types[Types.SELECTCHANGE]:
                const { options } = value.target as HTMLSelectElement;
                const val: string[] = [];
                for (let i = 0, l = options.length; i < l; i += 1) 
                    if (options[i].selected) val.push(options[i].value);    

                this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
                    table.activeRow.cells.filter(cell => cell.id === cellId)
                        .forEach(cell => {cell.value = val;});
                    table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== ""); }); 
               break;*/
          /*  case Types[Types.CELLCHANGE]:
                this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
                    table.activeRow.cells.filter(cell => cell.id === cellId)
                        .forEach(cell => {
                            cell.value = cellType === DataType[DataType.Text] ?
                            formatService.checkForbidSymbols(value.target.value, cell.forbiddenSymbols): value.target.value;
                        });
                    table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== "");}); 
               break;*/
        } 
    }

    formatCell = (cell: Cell, action: string) : string => {
        var result="";
        switch(action){
            case Types[Types.FORMATDATE]:
                result = formatService.formatDate(cell.value, cell.dateFormat);
                break;
            case Types[Types.FORMATSELECT]:
                result = cell.value.toString();
                break;
            case Types[Types.HELPERTEXT]:
                result = formatService.formatHelperText(cell);
                break;
        }
        return result;
    }
}