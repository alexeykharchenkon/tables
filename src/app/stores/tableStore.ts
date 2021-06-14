import { makeAutoObservable } from "mobx";
import { Guid } from "guid-typescript";
import { TableModel } from "../common/models/TableModel";
import { DataType } from "../common/models/DataType";

export class TableStore {
    tables: TableModel[] = [];
    tableTitleValue: string = "";
    colTypeSelectValue: DataType = DataType.Text;
    addColumValue: string = "";
    
    constructor(){
        makeAutoObservable(this)
    }

    createTable = () => {
        this.tables.unshift({
            id: Guid.create().toString(), 
            title: Boolean(this.tableTitleValue) ? this.tableTitleValue : "Table", 
            columns: [],
            cells: [], });

        this.tableTitleValue = "";    
    }

    addColumn = (tableId: string) => {
        this.tables.filter(table => table.id === tableId)
        .forEach(table=> { 
            if(table.columns.length < 10)
                table.columns.push({
                    id: (table.columns.length-1).toString() ?? "0",
                    label: Boolean(this.addColumValue) ? this.addColumValue : "Column",
                    type: this.colTypeSelectValue,
                });
        })

        this.colTypeSelectValue = DataType.Text;
        this.addColumValue = "";
    }

    tableTitleValueOnChange = (value: string) => {
        this.tableTitleValue = value;
    }

    colTypeSelectValueChange = (value: DataType) => {
        this.colTypeSelectValue = value;
    }

    addColumValueChange = (value: string) => {
        this.addColumValue = value;
    }
}