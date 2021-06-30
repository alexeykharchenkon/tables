import React from 'react';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { Checkbox} from '@material-ui/core';


interface CellProps {
    cell: Cell;
    formatDate: any;
    formatSelect: any;
    checkboxValueChange: any;
    tableId: string;
    tableDataId: string;
    rowId: string;
}

export const CellComponent = ({cell, formatDate, formatSelect,
    checkboxValueChange, tableId, tableDataId, rowId}: CellProps) => {
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
                checked={cell.value}
                onChange={e => checkboxValueChange(e.target.checked, cell.id, tableId, tableDataId, rowId)}
            /> 
           }
        </>
      );
}

