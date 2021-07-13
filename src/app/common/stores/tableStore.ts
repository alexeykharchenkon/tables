import { makeAutoObservable } from "mobx";
import { dbService } from "@common/services/DBService";
import { TableSchema } from "@common/models/TableSchema";
import { Column } from "@common/models/Column";
import { DataTable } from "@common/models/DataTable";
import { Cell} from "@common/models/Cell";
import { Row } from "@common/models/Row";
import { Guid } from "guid-typescript";
import { Types } from "@common/models/Types";
import { DataType } from "@common/models/DataType";

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

    UpdateData = (schemaId: string, col: Column, id: string, type: string) => {
        switch(type){
            case Types[Types.UPDATEDATAADDCOLUMN]:
                dbService.AddColumn(col);
                this.columns.push(col);
                this.dataTables.filter(table => table.schemaId === schemaId)
                .forEach(table => {
                    this.rows.filter(row => row.tableId === table.id)
                    .forEach(row => {
                            const cell = {
                                id: Guid.create().toString(),
                                rowId: row.id,
                                colId: col.id,
                                tableId: table.id,
                                type: col.type,
                                value: "",
                                selectOptions: col.selectOptions,
                                forbiddenSymbols: col.forbiddenSymbols,
                                multySelectMode: col.multySelectMode,
                                dateFormat: col.dateFormat,
                                isRequired: col.isRequired,
                                maxLength: col.maxLength,
                                maxItemsSelected: col.maxItemsSelected,
                                minValue: col.minValue,
                                maxValue: col.maxValue,
                                error: "",
                            }
                            dbService.AddCell(cell);
                            this.cells.push(cell);
                        });
                    });    
                break;
            case Types[Types.UPDATEDATADELETECOLUMN]:
                dbService.DeleteColumnById(id);
                this.columns = this.columns.filter(col => col.id !== id);
                this.cells.forEach(cel=> {cel.id === col.id && dbService.DeleteCellById(cel.id)});
                this.cells = this.cells.filter(cel => cel.id !== col.id);
                break;
            case Types[Types.UPDATEDATAUPDATECOLUMN]:
                this.cells.filter(cel=> cel.colId === col.id)
                .forEach(cel => {
                    cel.value = cel.type === col.type ? cel.value : "";
                    if(col.type === DataType[DataType.DatePicker]) cel.value = new Date();
                    cel.type = col.type;
                    cel.selectOptions= col.selectOptions;
                    cel.forbiddenSymbols= col.forbiddenSymbols;
                    cel.multySelectMode= col.multySelectMode;
                    cel.dateFormat= col.dateFormat;
                    cel.isRequired= col.isRequired;
                    cel.maxLength= col.maxLength;
                    cel.maxItemsSelected= col.maxItemsSelected;
                    cel.minValue= col.minValue;
                    cel.maxValue= col.maxValue;

                    dbService.UpdateCell(cel);
                });
                dbService.UpdateColumn(col);

                this.columns = this.columns?.map(coll=>{
                    if(coll.id === col.id) {return {...col};
                    }else{return {...coll}}});
                break;    
        }
    }

    AddRow = (activeRowId: string, activeTableId: string, activeCells: Cell[]) => {
        this.rows.push({id: activeRowId, tableId: activeTableId});
        this.cells.push(...activeCells);
        dbService.AddRow({id: activeRowId, tableId: activeTableId});
        activeCells.forEach(cel => dbService.AddCell(cel));
    }

    UpdateRow = (activeCells: Cell[]) => {
        this.cells.forEach(cel => {
            activeCells.forEach(aCel => {
                if(cel.id===aCel.id) cel.value = aCel.value;});});
        activeCells.forEach(cel => dbService.UpdateCell(cel));
    }

    DeleteRow = (rowId: string) => {
        dbService.DeleteRowById(rowId);
        this.cells.forEach(cel => {cel.rowId === rowId && dbService.DeleteCellById(cel.id)});
        this.rows = this.rows.filter(row => row.id !== rowId);
        this.cells = this.cells.filter(cell => cell.rowId !== rowId);
    }

    AddSchema = (id: string, title: string) => {
        this.tableSchemas.push({id: id, title: title});
        dbService.CreateTableSchema(id, title);
                
    }

    DeleteSchema = (id: string) => {
        this.tableSchemas = this.tableSchemas.filter(tab => tab.id !== id);
        dbService.DeleteTableSchema(id);       
    }

    CreateTable =(id: string, schemaId: string, title: string) => {
        this.dataTables.push({id: id, title: title, schemaId: schemaId});
        dbService.CreateDataTable(id, title, schemaId);
    }

    DeleteTable = (id: string) => {
        this.dataTables = this.dataTables.filter(tab => tab.id !== id);
        dbService.DeleteDataTable(id);
        this.cells.forEach(cel => {cel.tableId === id && dbService.DeleteCellById(cel.id)});
        this.rows.forEach(row => {row.tableId === id && dbService.DeleteRowById(row.id)});
        this.rows = this.rows.filter(row => row.tableId !== id);
        this.cells = this.cells.filter(cell => cell.tableId !== id);
    }
}