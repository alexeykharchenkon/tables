import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';


interface TextProps {
    cell: Cell;
    onValueChange: any;
    tableId: string;
    helperText: any;
}

export const TextComponent = ({cell, onValueChange, tableId, helperText}: TextProps) => {    
    return (
            <>
                <Typography style={{color: 'red'}}>
                    {cell.error}
                </Typography>
                <TextField 
                    label = 'Enter Data'
                    value={cell.value}
                    onChange={e => onValueChange(e, tableId, "", "", cell.id, cell.type, "CELLCHANGE")}
                    helperText={helperText(cell)}
                />
            </>
      );
}