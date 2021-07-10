import React from 'react';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { Checkbox} from '@material-ui/core';
import { Types } from '@common/models/Types';


interface CellProps {
    cell: Cell;
    formatCell: any;
    onValueChange: any;
}

export const CellComponent = ({cell, formatCell, onValueChange}: CellProps) => {
    return (
        <>
           {cell.type === DataType[DataType.Text] && cell.value}
           {cell.type === DataType[DataType.Number] && cell.value}
           {cell.type === DataType[DataType.DatePicker] && formatCell(cell, Types[Types.FORMATDATE])}
           {cell.type === DataType[DataType.Select] && formatCell(cell, Types[Types.FORMATSELECT])}
           {cell.type === DataType[DataType.Checkbox] && 
            <Checkbox
                checked={cell.value === "true"? true: false}
                onChange={e => onValueChange(e, cell.id, Types[Types.CHECKBOXCHANGE])}
            /> 
           }
        </>
      );
}

