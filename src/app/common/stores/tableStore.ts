import { makeAutoObservable } from "mobx";
import { dbService } from "@common/services/DBService";
import { TableSchema } from "@common/models/TableSchema";
import { Column } from "@common/models/Column";
import { DataTable } from "@common/models/DataTable";
import { Cell} from "@common/models/Cell";
import { Row } from "@common/models/Row";
import { Guid } from "guid-typescript";
import { Types } from "@common/models/Types";

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

                this.columns.filter(coll => coll.id === col.id)
                .forEach(coll => {
                    coll.id = col.id;
                    coll.schemaId = col.schemaId;
                    coll.type = col.type;
                    coll.label =  col.label;
                    coll.selectOptions =  col.selectOptions;
                    coll.forbiddenSymbols = col.forbiddenSymbols;
                    coll.multySelectMode =  col.multySelectMode;
                    coll.dateFormat = col.dateFormat;
                    coll.isRequired =  col.isRequired;
                    coll.maxLength =   col.maxLength;
                    coll.maxItemsSelected = col.maxItemsSelected;
                    coll.minValue = col.minValue;
                    coll.maxValue = col.maxValue;
                });
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
}