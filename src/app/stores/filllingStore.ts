import { Guid } from "guid-typescript";
import { makeAutoObservable } from "mobx";
import { Row } from "../common/models/Row";
import { TableModel } from "../common/models/TableModel";
import { tableService } from "../services/TableService";
import { TableStore } from "./tableStore";

export class FillingStore {
    tableStore: TableStore;
    fillingMode: boolean = false;
    addEditRowMode: boolean = false;
    fillingTable: TableModel = {id: "", title: "", columns: [], rows: []};
    activeRow: Row = {id: "", cells: []};
    
    constructor(tableStore: TableStore){
        this.tableStore = tableStore;
        makeAutoObservable(this)
    }

    chooseTable = (tableId: string) => {
        this.fillingTable = this.tableStore.tables.filter(table => table.id === tableId)[0];
        this.fillingMode = true;
        this.addEditRowMode = false;
    }

    addRow = (tableId: string) => {
        this.addEditRowMode = true;
        this.activeRow.id = Guid.create().toString();
        this.activeRow.cells = [];
        this.tableStore.tables.filter(table => table.id === tableId)[0].columns
        .forEach(column => {
            this.activeRow.cells.push({
                id: Guid.create().toString(),
                type: column.type,
                value: "",
            });
        });
    }

    saveRow = (tableId: string) => {
       this.addEditRowMode = false;
       this.tableStore.tables.filter(table => table.id === tableId)
        .forEach(table=> { 
           if(!table.rows.filter(row => row.id === this.activeRow.id).length){
                    table.rows.push({
                        id: this.activeRow.id,
                        cells: this.activeRow.cells,
                    });
            } else{
                    table.rows.filter(row => row.id === this.activeRow.id)
                    .forEach(row=> {
                        row = this.activeRow;
                    })
                }
        });

        this.activeRow= {id: "", cells: []};

        tableService.save(this.tableStore.tables);
    }

    cellValueChange = (value: string, cellId: string) => {
        this.activeRow.cells.filter(cell => cell.id === cellId)
        .forEach(cell => {cell.value = value;})
    }

    editRow = (tableId: string, rowId: string) => {
        this.addEditRowMode = true;
        this.tableStore.tables.filter(table => table.id === tableId)
        .forEach(table => { 
            this.activeRow = table.rows.filter(row => row.id === rowId)[0];
        });
    }

    deleteRow = (tableId: string, rowId: string) => {
        this.tableStore.tables.filter(table => table.id === tableId)
        .forEach(table => { table.rows = table.rows.filter(row => row.id !== rowId);})
        
        tableService.save(this.tableStore.tables);
    }
}