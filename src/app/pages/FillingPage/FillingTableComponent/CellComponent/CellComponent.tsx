import React from 'react';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';


interface CellProps {
    cell: Cell;
}

export const CellComponent = ({cell}: CellProps) => {
    return (
        <>
           {cell.type.valueOf().toString() === DataType.Text.valueOf().toString() && cell.value}
           {cell.type.valueOf().toString() === DataType.Number.valueOf().toString() && cell.value}
           {cell.type.valueOf().toString() === DataType.DatePicker.valueOf().toString() && cell.value}
           {cell.type.valueOf().toString() === DataType.Select.valueOf().toString() && cell.value}
        </>
      );
}