import React from 'react';
import { observer } from 'mobx-react-lite';
import { TextField } from '@material-ui/core';
import { Cell } from '../../../../common/models/Cell';
import { DataType } from '../../../../common/models/DataType';

interface CProps {
    cell: Cell;
    cellValueChange: any;
}

export const CellComponent = observer(({cell, 
    cellValueChange}: CProps) => {
    return (
        <>
                   {cell.type.valueOf().toString() === DataType.Text.valueOf().toString() &&
                    <TextField 
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id)}
                    />
                   }
                   {cell.type.valueOf().toString() === DataType.Number.valueOf().toString() &&
                    <TextField 
                        type = 'number'
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id)}
                    />
                   }
                   {cell.type.valueOf().toString() === DataType.DatePicker.valueOf().toString() &&
                    <TextField
                        type="date"
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id)}
                  />
                   }

           </>
      );
});