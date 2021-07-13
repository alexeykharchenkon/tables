import { makeAutoObservable} from "mobx";
import { TableStore } from "@common/stores/tableStore";
import { fillingStoreService } from "@pages/FillingPage/common/services/FillingStoreService";
import { Cell } from "@common/models/Cell";
import { formatService } from "@common/services/FormatService";
import { Types } from "@common/models/Types";
import { dbService } from "@common/services/DBService";
import { Guid } from "guid-typescript";
import { validateService } from "@common/services/ValidateService";

export class FillingStore {
    tableStore: TableStore;
    titleValue: string = "";
    activeSchemaId: string = ""; 
    activeTableId: string = "";
    addEditRowMode: boolean = false;
    isNewRow: boolean = true; 
    activeRowId: string = "";
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
                this.tableStore.CreateTable(this.activeTableId, this.activeSchemaId,this.titleValue)
                this.titleValue = "";
                break;
            case Types[Types.DELETETABLE]:
                this.tableStore.DeleteTable(this.activeTableId);
                this.activeTableId= "";
                break;
        }
    }

    crudRow = (rowId: string, action: string) => {
        switch(action){
           case Types[Types.ADDROW]:
                this.activeRowId = Guid.create().toString();
                fillingStoreService.SetActiveCellsForNewRow(this.activeCells, this.tableStore.columns, this.activeSchemaId, this.activeTableId, this.activeRowId);
                this.isNewRow = true;
                this.addEditRowMode = true;
                break;
            case Types[Types.EDITROW]:
                fillingStoreService.SetActiveCellsForRowEdit(this.activeCells, this.tableStore.cells, rowId);
                this.activeRowId = rowId;
                this.addEditRowMode = true;
                this.isNewRow = false;
                break;
            case Types[Types.DELETEROW]:
                this.tableStore.DeleteRow(rowId);
                break;
            case Types[Types.SAVEROW]:
                if(validateService.validate(this.activeCells)){
                    if(this.isNewRow){
                        this.tableStore.AddRow(this.activeRowId,this.activeTableId,this.activeCells);
                        this.activeRowId = "";
                        this.addEditRowMode = false;
                    }else{
                        this.tableStore.UpdateRow(this.activeCells);
                        this.addEditRowMode = false;
                        this.activeRowId = "";
                    }
                }
                this.activeCells = this.activeCells.filter(c => c.id !== "");
                break;
            case Types[Types.CANCELADDROW]:
                this.addEditRowMode = false;
                this.activeRowId = "";    
                break;
        }
    }

    onValueChange = (e: any, cellId: string, changeType: string) => {
        switch(changeType){
            case Types[Types.DATECHANGE]:
                this.activeCells.filter(c => c.id === cellId)
                .forEach(cel=> cel.value = e);
                this.activeCells = this.activeCells.filter(c => c.id !== "");
               break;
            case Types[Types.CHECKBOXCHANGE]:
                this.tableStore.cells.filter(c => c.id === cellId)
                .forEach(cel=> {
                    cel.value = e.target.checked ? "true" : "false";
                    dbService.UpdateCell(cel);
                });
                this.tableStore.cells = this.tableStore.cells.filter(c => c.id !== "");  
               break;
           case Types[Types.TITLECHANGE]:
               this.titleValue = e.target.value;
               break;
           case Types[Types.SELECTCHANGE]:
                const { options } = e.target as HTMLSelectElement;
                const val: string[] = [];
                for (let i = 0, l = options.length; i < l; i += 1) 
                    if (options[i].selected) val.push(options[i].value);
                this.activeCells.filter(c => c.id === cellId)
                .forEach(cel=> cel.value = val.join('/'));
                this.activeCells = this.activeCells.filter(c => c.id !== "");
               break;
            case Types[Types.CELLCHANGE]:
                this.activeCells.filter(c => c.id === cellId)
                .forEach(cel=> cel.value = formatService.checkForbidSymbols(e.target.value, cel.forbiddenSymbols));
                this.activeCells = this.activeCells.filter(c => c.id !== "");
               break;
        } 
    }

    formatCell = (cell: Cell, action: string) : string => {
        var result="";
        switch(action){
            case Types[Types.FORMATDATE]:
                result = formatService.formatDate(cell.value, cell.dateFormat);
                break;
            case Types[Types.FORMATSELECT]:
                result = cell.value;
                break;
            case Types[Types.HELPERTEXT]:
                result = formatService.formatHelperText(cell);
                break;
        }
        return result;
    }
}