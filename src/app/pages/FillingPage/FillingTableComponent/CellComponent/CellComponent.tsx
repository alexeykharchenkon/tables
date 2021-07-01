import React from 'react';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { Checkbox} from '@material-ui/core';


interface CellProps {
    cell: Cell;
    formatDate: any;
    formatSelect: any;
    onValueChange: any;
    tableId: string;
    tableDataId: string;
    rowId: string;
}

export const CellComponent = ({cell, formatDate, formatSelect,
    onValueChange, tableId, tableDataId, rowId}: CellProps) => {
    return (
        <>
           {cell.type === DataType[DataType.Text] && cell.value}
           {cell.type === DataType[DataType.Number] && cell.value}
           {cell.type === DataType[DataType.DatePicker] && 
                formatDate(cell.value, cell.dateFormat)}
           {cell.type === DataType[DataType.Select] && 
                formatSelect(cell.value)}
           {cell.type === DataType[DataType.Checkbox] && 
            <Checkbox
                checked={Boolean(cell.value)}
                onChange={e => onValueChange(e.target.checked, tableId, tableDataId, rowId, cell.id, "", "CHECKBOXCHANGE")}
            /> 
           }
        </>
      );
}

