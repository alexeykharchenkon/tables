import React from 'react';
import { Checkbox, TextField } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { SelectCellComponent } from './SelectCellComponent';
import { DateComponent } from './DateComponent';

interface CellProps {
    cell: Cell;
    cellValueChange: any;
    tableId: string;
    selectValueChange: any;
    handleDateChange: any;
}

export const CellComponent = ({cell, cellValueChange, 
    tableId, selectValueChange, handleDateChange}: CellProps) => {    
        return (
        <>
                   {cell.type === DataType[DataType.Text] &&
                    <TextField 
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, cell.type)}
                        helperText={'Empty'}
                    />
                   }
                   {cell.type === DataType[DataType.Number] &&
                    <TextField 
                        type = 'number'
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, cell.type)}
                    />
                   }
                    {cell.type === DataType[DataType.Checkbox] &&
                     <Checkbox
                        checked={true}
                    />
                   }
                  <SelectCellComponent 
                    cell= {cell}
                    tableId= {tableId}
                    selectValueChange={selectValueChange}
                  />
                  <DateComponent 
                     cell= {cell}
                     tableId= {tableId}
                     handleDateChange={handleDateChange}
                  />
           </>
      );
}