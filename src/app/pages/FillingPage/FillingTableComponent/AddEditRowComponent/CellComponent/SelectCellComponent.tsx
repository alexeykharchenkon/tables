import React from 'react';
import { observer } from 'mobx-react-lite';
import { Select } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';

interface SelectCellProps {
    cell: Cell;
    tableId: string;
    tabDataId: string;
    selectValueChange: any;
}

export const SelectCellComponent = observer(({cell,
    tableId, tabDataId, selectValueChange}: SelectCellProps) => {
    return (
        <>
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