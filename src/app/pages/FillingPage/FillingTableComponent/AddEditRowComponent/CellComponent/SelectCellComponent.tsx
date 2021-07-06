import React from 'react';
import { FormControl, FormHelperText, Select, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { Types } from '@common/models/Types';

interface SelectCellProps {
    cell: Cell;
    tableId: string;
    onValueChange: any;
    helperText: any;
}

export const SelectCellComponent = ({cell, tableId, onValueChange,
    helperText}: SelectCellProps) => {
    return (
        <>
                   {cell.type === DataType[DataType.Select]&&
                        cell.multySelectMode && 
                        <FormControl>
                            <Typography style={{color: 'red'}}>
                                    {cell.error}
                            </Typography>
                            <Select
                                native
                                multiple
                                style={{minWidth:'100px'}}
                                value={cell.value}
                                onChange={e => onValueChange(e, tableId, "", "", cell.id, "", Types[Types.SELECTCHANGE])}
                            >
                                {cell.selectOptions.map((s, index) => (
                                    <option 
                                        key={index}
                                        value={s}
                                    >{s}</option>
                                ))}
                            </Select>
                            <FormHelperText>{helperText(cell)}</FormHelperText>
                        </FormControl>
                   }
                   {cell.type === DataType[DataType.Select] &&
                        !cell.multySelectMode && 
                        <FormControl>
                            <Typography style={{color: 'red'}}>
                                {cell.error}
                            </Typography>
                            <Select
                                native
                                style={{minWidth:'100px'}}
                                value={cell?.value[0]}
                                label={"Hello"}
                                onChange={e => onValueChange(e, tableId, "", "", cell.id, "", Types[Types.SELECTCHANGE])}
                            >
                                <option></option>
                                {cell.selectOptions.map((s, index) => (
                                    <option 
                                        key={index}
                                        value={s}
                                    >{s}</option>
                                ))}
                            </Select>
                            <FormHelperText>{helperText(cell)}</FormHelperText>
                        </FormControl>
                   }
          </>
      );
}