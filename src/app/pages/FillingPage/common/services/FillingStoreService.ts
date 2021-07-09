import { Guid } from "guid-typescript";
import { Cell } from "@common/models/Cell";
import { Column } from "@common/models/Column";
import { DataType } from "@common/models/DataType";

class FillingStoreService {
    SetActiveCellsForNewRow(activeCells: Cell[], columns: Column [], schemaId: string, 
        tableId: string, rowId: string) {
        activeCells.splice(0);
        columns.filter(col => col.schemaId === schemaId)
        .forEach(col=> {
            var val;
            switch(col.type) {
                case DataType[DataType.Select]:
                    val = [""];
                    break;
                case DataType[DataType.DatePicker]:
                    val = new Date();
                    break;
                default:
                    val = "";
            } 
            activeCells.push({
                id:Guid.create().toString(),
                rowId: rowId,
                tableId: tableId,
                type: col.type,
                value: val,
                selectOptions:col.selectOptions,
                forbiddenSymbols:col.forbiddenSymbols,
                multySelectMode: col.multySelectMode,
                dateFormat:col.dateFormat,
                isRequired: col.isRequired,
                maxLength : col.maxLength,
                maxItemsSelected:col.maxItemsSelected,
                minValue:col.minValue,
                maxValue:col.maxValue,
                error: "",
            });
        });
    }

    SetActiveCells(activeCells: Cell[], cells: Cell[], rowId: string) {
        activeCells.splice(0);
        cells.filter(cel => cel.rowId === rowId)
        .forEach(cel => {activeCells.push({...cel});});
    }
}

export const fillingStoreService = new FillingStoreService();