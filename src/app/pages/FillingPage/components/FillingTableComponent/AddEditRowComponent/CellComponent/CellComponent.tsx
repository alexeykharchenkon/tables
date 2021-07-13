import React from 'react';
import { Checkbox} from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { SelectCellComponent } from './SelectCellComponent';
import { DateComponent } from './DateComponent';
import { TextComponent } from './TextComponent';
import { NumberComponent } from './NumberComponent';

interface CellProps {
    cell: Cell;
    onValueChange: any;
    formatCell: any;
}

export const CellComponent = ({cell, onValueChange, formatCell}: CellProps) => {    
   const props = {
    cell: cell,
    formatCell: formatCell,
    onValueChange: onValueChange,
   }  
    return (
            <>
                {cell.type === DataType[DataType.Text] &&
                   <TextComponent {...props} />}
                {cell.type === DataType[DataType.Number] &&
                    <NumberComponent {...props} />}
                {cell.type === DataType[DataType.Checkbox] &&
                     <Checkbox checked={true} />}
                {cell.type === DataType[DataType.Select] &&
                    <SelectCellComponent {...props} />}
                {cell.type === DataType[DataType.DatePicker] &&
                    <DateComponent {...props} />}
           </>
      );
}