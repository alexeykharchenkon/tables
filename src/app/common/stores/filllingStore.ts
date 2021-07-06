import { makeAutoObservable} from "mobx";
import { tableService } from "@common/services/TableService";
import { TableStore } from "./tableStore";
import { fillingStoreService } from "@common/services/FillingStoreService";
import { DataType } from "@common/models/DataType";
import { Cell } from "@common/models/Cell";
import { formatService } from "@common/services/FormatService";
import { Types } from "@common/models/Types";

export class FillingStore {
    tableStore: TableStore;
    titleValue: string = "";
    activeTableId: string = "";
    
    constructor(tableStore: TableStore){
        makeAutoObservable(this);
        this.tableStore = tableStore;
    }

    chooseTable = (tableId: string) => {
        this.tableStore.tables.filter(tab => tab.id === tableId)[0].fillingMode = true;
        this.tableStore.tables.filter(tab => tab.id !== tableId)
        .forEach(table => {table.fillingMode = false;});
    }

    addTable = (tableId: string) => {
        fillingStoreService.addTable(this.tableStore.tables, tableId, this.titleValue);
        this.titleValue = "";
    }

    deleteTable = (tableId: string, tableDataId: string) => {
        fillingStoreService.deleteTableById(this.tableStore.tables, tableId, tableDataId);
        tableService.save(this.tableStore.tables);
    }

    addRow = (tableId: string, tabDataId: string) => {
        fillingStoreService.addRow(this.tableStore.tables, tableId);
        this.activeTableId = tabDataId;
    }

    editRow = (tableId: string, tableDataId: string, rowId: string) => {
        fillingStoreService.editRow(this.tableStore.tables, tableId, tableDataId, rowId);   
        this.activeTableId = tableDataId;
    }

    deleteRow = (tableId: string, tableDataId: string, rowId: string) => {      
        fillingStoreService.deleteRowById(this.tableStore.tables, tableId, tableDataId, rowId);
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
        tableService.save(this.tableStore.tables);
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
            case Types[Types.DATECHANGE]:
                this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
                    table.activeRow.cells.filter(cell => cell.id === cellId)
                        .forEach(cell => {cell.value = value;});
                    table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== "");
                }); 
               break;
            case Types[Types.CHECKBOXCHANGE]:
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
               break;
           case Types[Types.TITLECHANGE]:
               this.titleValue = value.target.value;
               break;
           case Types[Types.SELECTCHANGE]:
                const { options } = value.target as HTMLSelectElement;
                const val: string[] = [];
                for (let i = 0, l = options.length; i < l; i += 1) 
                    if (options[i].selected) val.push(options[i].value);    

                this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
                    table.activeRow.cells.filter(cell => cell.id === cellId)
                        .forEach(cell => {cell.value = val;});
                    table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== ""); }); 
               break;
            case Types[Types.CELLCHANGE]:
                this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
                    table.activeRow.cells.filter(cell => cell.id === cellId)
                        .forEach(cell => {
                            cell.value = cellType === DataType[DataType.Text] ?
                            formatService.checkForbidSymbols(value.target.value, cell.forbiddenSymbols): value.target.value;
                        });
                    table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== "");}); 
               break;
        } 
    }

    formatDate = (value: any, dateFormat: string) : string => {
       return formatService.formatDate(value, dateFormat);
    }

    formatSelect = (value: string[]): string => {
        return value.toString();
    }
    helperText = (cell: Cell): string => {
        return formatService.formatHelperText(cell);
    }
}