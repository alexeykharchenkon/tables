import React from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, TextField } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { SelectCellComponent } from './SelectCellComponent';

interface CellProps {
    cell: Cell;
    cellValueChange: any;
    tableId: string;
    tabDataId: string;
    selectValueChange: any;
    checkboxValueChange: any;
}

export const CellComponent = observer(({cell, cellValueChange, 
    tableId, tabDataId, selectValueChange, checkboxValueChange}: CellProps) => {
    return (
        <>
                   {cell.type.valueOf().toString() === DataType.Text.valueOf().toString() &&
                    <TextField 
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, tabDataId, cell.type)}
                    />
                   }
                   {cell.type.valueOf().toString() === DataType.Number.valueOf().toString() &&
                    <TextField 
                        type = 'number'
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, tabDataId, cell.type)}
                    />
                   }
                   {cell.type.valueOf().toString() === DataType.DatePicker.valueOf().toString() &&
                    <TextField
                        type={cell.dateFormat}
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, tabDataId, cell.type)}
                  />
                   }
                    {cell.type.valueOf().toString() === DataType.Checkbox.valueOf().toString() &&
                     <Checkbox
                        checked={cell.value}
                        onChange={e => checkboxValueChange(e.target.checked, cell.id, tableId, tabDataId)}
                    />
                   }
                  <SelectCellComponent 
                        cell= {cell}
                        tableId= {tableId}
                        tabDataId={tabDataId}
                        selectValueChange={selectValueChange}
                  />
           </>
      );
});