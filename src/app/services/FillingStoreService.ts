import { AdditionalTable } from "@app/common/models/AdditionalTable";
import { DataType } from "@common/models/DataType";
import { TableData } from "@common/models/TableData";
import { Guid } from "guid-typescript";

const requests = {
    deleteRowById: (tables:  AdditionalTable[], tableId: string, tableDataId: string, id: string) => {
           tables.filter(table => table.id === tableId)
            .forEach(table => { 
                table.tablesData
                .filter(tabData => tabData.id === tableDataId)
                    .forEach(tabData => {
                        tabData.rows = tabData.rows.filter(row => row.id !== id);
                    });
            });
    },
    editRow: (tables:  AdditionalTable[], tableId: string, tableDataId: string, id: string) => {
        tables.filter(t => t.id === tableId).forEach(table => {
            table.tablesData
            .filter(tabData => tabData.id === tableDataId)
                .forEach(tabData => {
                    table.activeRow = requests.getRowById(tabData, id);
                    table.addEditRowMode = true;
                });
        }); 
    },
    deleteTableById: (tables:  AdditionalTable[], tableId: string, tableDataId: string) => {
        tables.filter(table => table.id === tableId)
         .forEach(table => { 
             table.tablesData = table.tablesData.filter(t => t.id !== tableDataId);
         });
    },
    getRowById: (tablesData: TableData, id: string) : any => {
        return tablesData.rows.find(row => row.id === id);
    },
    saveRow:(tables: AdditionalTable[], tableId: string, tableDataId: string) => {
        tables.filter(table => table.id === tableId)
        .forEach(table => {
            table.tablesData
            .filter(tabData => tabData.id === tableDataId)
                .forEach(tabData => {
                    if(!requests.getRowById(tabData, table.activeRow.id)){
                        tabData.rows.push({
                            id: table.activeRow.id, 
                            cells: table.activeRow.cells,});
                    }else{
                        tabData.rows.filter(row => row.id === table.activeRow.id)
                        .forEach(row => {row.cells = table.activeRow.cells;});
                    }    
            })
           
            table.activeRow = {id: "", cells: []};
            table.addEditRowMode = false;
        });
    },
    addRow:(tables: AdditionalTable[], tableId: string) => {
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
                });
            });
        });
    },
    addTable:(tables: AdditionalTable[], tableId: string, titleValue: string) => {
        tables.filter(tab => tab.id === tableId)[0].tablesData
        .unshift({
            id: Guid.create().toString(),
            title: Boolean(titleValue) ? titleValue : "Table " + (tables.filter(tab => tab.id === tableId)[0].tablesData.length + 1).toString(),
            rows:[], 
        });
    },
    checkForbidSymbols:(value: string, forbiddenSymbols: string) : string => {
        var forbidSymbArray = forbiddenSymbols.split(',');
        for(var str of forbidSymbArray) 
            value = value.split(str).join('');
        return value;
    },
    formatDate: (value: any, dateFormat: string) : string => {
        const pad = (s: any): string => { return (s < 10) ? '0' + s : s; }
        var d = new Date(value);

        switch(dateFormat){
            case "dd/MM/yyyy":
                return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
            case "MM/dd/yyyy":
                return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/');
            case "yyyy/MM/dd":
                return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('/');
            case "yyyy/dd/MM":
                return [d.getFullYear(), pad(d.getDate()), pad(d.getMonth()+1)].join('/');
        }

        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    },
}

export const fillingStoreService = {
    deleteRowById: (tables:  AdditionalTable[], tableId: string, tableDataId: string, id: string) => requests.deleteRowById(tables, tableId, tableDataId, id),
    editRow: (tables:  AdditionalTable[], tableId: string, tableDataId: string, id: string) => requests.editRow(tables, tableId, tableDataId, id),
    deleteTableById: (tables:  AdditionalTable[], tableId: string, tableDataId: string) => requests.deleteTableById(tables, tableId, tableDataId),
    getRowById: (tablesData: TableData, id: string) => requests.getRowById(tablesData, id),
    saveRow: (tables:  AdditionalTable[], tableId: string, tableDataId: string) => requests.saveRow(tables, tableId, tableDataId),
    addRow:(tables: AdditionalTable[], tableId: string) => requests.addRow(tables, tableId),
    addTable:(tables: AdditionalTable[], tableId: string, titleValue: string) => requests.addTable(tables, tableId, titleValue),
    checkForbidSymbols:(value: string, forbiddenSymbols: string) : string => requests.checkForbidSymbols(value, forbiddenSymbols),
    formatDate: (value: any, dateFormat: string) : string => requests.formatDate(value, dateFormat),
}
