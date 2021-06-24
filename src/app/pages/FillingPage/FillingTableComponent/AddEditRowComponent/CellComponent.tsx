import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select, TextField } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';

interface CellProps {
    cell: Cell;
    cellValueChange: any;
    tableId: string;
    tabDataId: string;
}

export const CellComponent = observer(({cell, cellValueChange, 
    tableId, tabDataId}: CellProps) => {
    return (
        <>
                   {cell.type.valueOf().toString() === DataType.Text.valueOf().toString() &&
                    <TextField 
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, tabDataId)}
                    />
                   }
                   {cell.type.valueOf().toString() === DataType.Number.valueOf().toString() &&
                    <TextField 
                        type = 'number'
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, tabDataId)}
                    />
                   }
                   {cell.type.valueOf().toString() === DataType.DatePicker.valueOf().toString() &&
                    <TextField
                        type="date"
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id, tableId, tabDataId)}
                  />
                   }
                   {cell.type.valueOf().toString() === DataType.Select.valueOf().toString() &&
                        <Select
                            native
                            style={{minWidth:'100px'}}
                            value={cell.value}
                            onChange={e =>  cellValueChange(e.target.value, cell.id, tableId, tabDataId)}
                        >
                            <option>
                            </option>
                            {cell.selectOptions.map((s, index) => (
                                <option 
                                key={index}
                                value={s}
                                >{s}</option>
                            ))}
                            
                        </Select>
                   }
           </>
      );
});