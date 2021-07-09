import React from 'react';
import { FormControl, FormHelperText, Select, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { Types } from '@common/models/Types';
import { SelectType } from '@common/models/SelectType';

interface SelectCellProps {
    cell: Cell;
    onValueChange: any;
    formatCell: any;
}

export const SelectCellComponent = ({cell, onValueChange, formatCell}: SelectCellProps) => {
    return (
        <>
                   {cell.type === DataType[DataType.Select]&&
                        cell.multySelectMode === SelectType[SelectType.Multy] && 
                        <FormControl>
                            <Typography style={{color: 'red'}}>
                                    {cell.error}
                            </Typography>
                            <Select
                                native
                                multiple
                                style={{minWidth:'100px'}}
                                value={cell.value}
                                onChange={e => onValueChange(e,cell.id,Types[Types.SELECTCHANGE])}
                            >
                                {cell.selectOptions.split('/').map((s, index) => (
                                    <option 
                                        key={index}
                                        value={s}
                                    >{s}</option>
                                ))}
                            </Select>
                            <FormHelperText>{formatCell(cell, Types[Types.HELPERTEXT])}</FormHelperText>
                        </FormControl>
                   }
                   {cell.type === DataType[DataType.Select] &&
                        cell.multySelectMode === SelectType[SelectType.Single] &&
                        <FormControl>
                            <Typography style={{color: 'red'}}>
                                {cell.error}
                            </Typography>
                            <Select
                                native
                                style={{minWidth:'100px'}}
                                value={cell?.value[0]}
                                label={"Hello"}
                                onChange={e => onValueChange(e,cell.id, Types[Types.SELECTCHANGE])}
                            >
                                <option></option>
                                {cell.selectOptions.split('/').map((s, index) => (
                                    <option 
                                        key={index}
                                        value={s}
                                    >{s}</option>
                                ))}
                            </Select>
                            <FormHelperText>{formatCell(cell, Types[Types.HELPERTEXT])}</FormHelperText>
                        </FormControl>
                   }
          </>
      );
}