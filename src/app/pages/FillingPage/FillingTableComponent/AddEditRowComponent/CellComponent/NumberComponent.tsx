import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';


interface NumberProps {
    cell: Cell;
    onValueChange: any;
    tableId: string;
    helperText: any;
}

export const NumberComponent = ({cell, onValueChange, tableId,
    helperText}: NumberProps) => {    
        return (
            <>
                <Typography style={{color: 'red'}}>
                        {cell.error}
                </Typography>
                <TextField 
                    type = 'number'
                    label = 'Enter Data'
                    value={cell.value}
                    helperText={helperText(cell)}
                    onChange={e => onValueChange(e, tableId, "", "", cell.id, cell.type, "CELLCHANGE")}
                />
            </>
      );
}