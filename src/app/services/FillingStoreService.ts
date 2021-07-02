import { AdditionalTable } from "@common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { TableData } from "@common/models/TableData";
import { Guid } from "guid-typescript";
import { validateService } from "./ValidateService";

export class fillingStoreService {
    static deleteRowById(tables:  AdditionalTable[], tableId: string, tableDataId: string, id: string) {
           tables.filter(table => table.id === tableId)
            .forEach(table => { 
                table.tablesData
                .filter(tabData => tabData.id === tableDataId)
                    .forEach(tabData => {
                        tabData.rows = tabData.rows.filter(row => row.id !== id);
                    });
            });
    }
    static editRow(tables:  AdditionalTable[], tableId: string, tableDataId: string, id: string)  {
        tables.filter(t => t.id === tableId).forEach(table => {
            table.tablesData
            .filter(tabData => tabData.id === tableDataId)
                .forEach(tabData => {
                    table.activeRow = fillingStoreService.getRowById(tabData, id);
                    table.addEditRowMode = true;
                });
            validateService.resetValidationErrors(table.activeRow);
        }); 
    }
    static deleteTableById(tables:  AdditionalTable[], tableId: string, tableDataId: string) {
        tables.filter(table => table.id === tableId)
         .forEach(table => { 
             table.tablesData = table.tablesData.filter(t => t.id !== tableDataId);
         });
    }
    static getRowById(tablesData: TableData, id: string) : any {
        return tablesData.rows.find(row => row.id === id);
    }
    static saveRow(tables: AdditionalTable[], tableId: string, tableDataId: string) {
        tables.filter(table => table.id === tableId)
        .forEach(table => {
            if(validateService.validate(table.activeRow)) {
                table.tablesData
                .filter(tabData => tabData.id === tableDataId)
                    .forEach(tabData => {
                        if(!fillingStoreService.getRowById(tabData, table.activeRow.id)){
                            tabData.rows.push({
                                id: table.activeRow.id, 
                                cells: table.activeRow.cells,});
                        }else{
                            tabData.rows.filter(row => row.id === table.activeRow.id)
                            .forEach(row => {row.cells = table.activeRow.cells;});
                        }    
                });
            
                table.activeRow = {id: "", cells: []};
                table.addEditRowMode = false;
            }
            table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== ""); 
        });
    }
    static addRow(tables: AdditionalTable[], tableId: string){
        tables.filter(table => table.id === tableId)
        .forEach(table => {
            table.activeRow.id = Guid.create().toString();
            table.activeRow.cells = [];
            table.addEditRowMode = true;
            table.columns.forEach(column => {
                var val;
                switch(column.type) {
                    case DataType[DataType.Select]:
                        val = [""];
                        break;
                    case DataType[DataType.Checkbox]:
                        val = false;
                        break;
                    case DataType[DataType.DatePicker]:
                        val = new Date();
                        break;
                } 

                table.activeRow.cells.push({
                    id: Guid.create().toString(),
                    type: column.type,
                    value: val ?? "",
                    selectOptions: column.selectOptions,
                    forbiddenSymbols: column.forbiddenSymbols,
                    multySelectMode: column.multySelectMode,
                    dateFormat: column.dateFormat,
                    isRequired: column.isRequired,
                    maxLength: column.maxLength,
                    maxItemsSelected: column.maxItemsSelected,
                    minValue: column.minValue,
                    maxValue: column.maxValue,
                    error: "",
                });
            });
        });
    }
    static addTable(tables: AdditionalTable[], tableId: string, titleValue: string){
        tables.filter(tab => tab.id === tableId)[0].tablesData
        .unshift({
            id: Guid.create().toString(),
            title: Boolean(titleValue) ? titleValue : "Table " + (tables.filter(tab => tab.id === tableId)[0].tablesData.length + 1).toString(),
            rows:[], 
        });
    }
    static cancelAddRow(tables: AdditionalTable[], tableId: string) {
        tables.filter(table => table.id === tableId)
        .forEach(table => {            
            table.activeRow = {id: "", cells: []};
            table.addEditRowMode = false;
            table.activeRow.cells = table.activeRow.cells.filter(cell => cell.id !== ""); 
        });
    }
}