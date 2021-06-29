import React from 'react';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { Checkbox } from '@material-ui/core';


interface CellProps {
    cell: Cell;
}

export const CellComponent = ({cell}: CellProps) => {
    return (
        <>
           {cell.type === DataType[DataType.Text] && cell.value}
           {cell.type === DataType[DataType.Number] && cell.value}
           {cell.type === DataType[DataType.DatePicker] && cell.value.toLocaleString()}
           {cell.type === DataType[DataType.Select] && cell.value}
           {cell.type === DataType[DataType.Checkbox] && 
            <Checkbox
                checked={Boolean(cell.value)}
            /> 
           }
        </>
      );
}

