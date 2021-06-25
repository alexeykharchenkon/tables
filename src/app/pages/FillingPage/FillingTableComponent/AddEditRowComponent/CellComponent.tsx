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
    selectValueChange: any;
}

export const CellComponent = observer(({cell, cellValueChange, 
    tableId, tabDataId, selectValueChange}: CellProps) => {
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
                   {cell.type.valueOf().toString() === DataType.Select.valueOf().toString() &&
                        cell.multySelectMode &&<Select
                            native
                            multiple
                            style={{minWidth:'100px'}}
                            value={cell.value}
                            onChange={e =>  selectValueChange(e, cell.id, tableId, tabDataId)}
                        >
                            <option></option>
                            {cell.selectOptions.map((s, index) => (
                                <option 
                                    key={index}
                                    value={s}
                                >{s}</option>
                            ))}
                        </Select>
                   }
                   {cell.type.valueOf().toString() === DataType.Select.valueOf().toString() &&
                        !cell.multySelectMode &&<Select
                            native
                            style={{minWidth:'100px'}}
                            value={cell?.value[0]}
                            onChange={e => selectValueChange(e, cell.id, tableId, tabDataId)}
                        >
                            <option></option>
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