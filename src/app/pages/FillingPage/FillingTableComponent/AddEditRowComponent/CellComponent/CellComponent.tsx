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
    tableId: string;
    formatCell: any;
}

export const CellComponent = ({cell, onValueChange, tableId, formatCell}: CellProps) => {    
        return (
            <>
                {cell.type === DataType[DataType.Text] &&
                   <TextComponent
                        cell= {cell}
                        tableId= {tableId}
                        formatCell={formatCell}
                        onValueChange={onValueChange}
                   />}
                {cell.type === DataType[DataType.Number] &&
                    <NumberComponent
                        cell= {cell}
                        tableId= {tableId}
                        formatCell={formatCell}
                        onValueChange={onValueChange}
                    />}
                {cell.type === DataType[DataType.Checkbox] &&
                     <Checkbox
                        checked={true}
                    />}
                <SelectCellComponent 
                    cell= {cell}
                    tableId= {tableId}
                    formatCell={formatCell}
                    onValueChange={onValueChange}
                />
                {cell.type === DataType[DataType.DatePicker] &&
                    <DateComponent 
                        cell= {cell}
                        tableId= {tableId}
                        formatCell={formatCell}
                        onValueChange={onValueChange}
                />}
           </>
      );
}