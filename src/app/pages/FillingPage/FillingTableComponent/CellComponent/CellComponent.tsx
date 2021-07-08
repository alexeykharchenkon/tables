import React from 'react';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { Checkbox} from '@material-ui/core';
import { Types } from '@common/models/Types';


interface CellProps {
    cell: Cell;
    formatCell: any;
    onValueChange: any;
    tableId: string;
    rowId: string;
}

export const CellComponent = ({cell, formatCell,
    onValueChange, tableId, rowId}: CellProps) => {
    return (
        <>
           {cell.type === DataType[DataType.Text] && cell.value}
           {cell.type === DataType[DataType.Number] && cell.value}
           {cell.type === DataType[DataType.DatePicker] && formatCell(cell, Types[Types.FORMATDATE])}
           {cell.type === DataType[DataType.Select] && formatCell(cell, Types[Types.FORMATSELECT])}
           {cell.type === DataType[DataType.Checkbox] && 
            <Checkbox
                checked={Boolean(cell.value)}
                onChange={e => onValueChange(e.target.checked, tableId, "", rowId, cell.id, "", Types[Types.CHECKBOXCHANGE])}
            /> 
           }
        </>
      );
}

