import { makeAutoObservable} from "mobx";
import { tableService } from "@services/TableService";
import { TableStore } from "./tableStore";
import { fillingStoreService } from "@services/FillingStoreService";
import { DataType } from "@common/models/DataType";

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
        tableService.save(this.tableStore.tables);
    }

    saveRow = (tableId: string, tableDataId: string) => {
        fillingStoreService.saveRow(this.tableStore.tables, tableId, tableDataId);
        tableService.save(this.tableStore.tables);
    }

    cellValueChange = (value: string, cellId: string, tabId: string, cellType: string) => {        
        this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
            table.activeRow.cells.filter(cell => cell.id === cellId)
                .forEach(cell => {
                    cell.value = cellType === DataType[DataType.Text] ?
                    value = fillingStoreService.checkForbidSymbols(value, cell.forbiddenSymbols): value;
                });

            table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== "");
        }); 
    }

    selectValueChange = (event: any, cellId: string, tableId: string) => {
        const { options } = event.target as HTMLSelectElement;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) 
          if (options[i].selected) 
            value.push(options[i].value);              

        this.tableStore.tables.filter(t => t.id === tableId).forEach(table => {
            table.activeRow.cells.filter(cell => cell.id === cellId)
                .forEach(cell => {cell.value = value;});

            table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== "");
        }); 
    }

    titleValueOnChange = (value: string) => {
        this.titleValue = value;
    }

    checkboxValueChange = (value: boolean, cellId: string, tabId: string, tableDataId: string, rowId: string) => {
        this.tableStore.tables.filter(table => table.id === tabId)
        .forEach(table => {
            table.tablesData
            .filter(tabData => tabData.id === tableDataId)
                .forEach(tabData => {
                    tabData.rows.filter(row => row.id === rowId)   
                    .forEach(row => {
                        row.cells.filter(cel => cel.id === cellId)
                            .forEach(cel => {
                                cel.value = value;
                            });                           
                    });
                    tabData.rows = tabData.rows.filter(row => row.id !== "");
            });
        }); 
        tableService.save(this.tableStore.tables);
    }
    
    handleDateChange = (value: Date, cellId: string, tabId: string) => {
        this.tableStore.tables.filter(t => t.id === tabId).forEach(table => {
            table.activeRow.cells.filter(cell => cell.id === cellId)
                .forEach(cell => {cell.value = value;});
            
            table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== "");
        }); 
    }

    formatDate = (value: any, dateFormat: string) : string => {
       return fillingStoreService.formatDate(value, dateFormat);
    }

    formatSelect = (value: string[]): string => {
        return value.toString();
    }
}