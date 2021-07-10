import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { Types } from '@common/models/Types';


interface NumberProps {
    cell: Cell;
    onValueChange: any;
    formatCell: any;
}

export const NumberComponent = ({cell, onValueChange, formatCell}: NumberProps) => {    
        return (
            <>
                <Typography style={{color: 'red'}}>
                        {cell.error}
                </Typography>
                <TextField 
                    type = 'number'
                    label = 'Enter Data'
                    value={cell.value}
                    helperText={formatCell(cell, Types[Types.HELPERTEXT])}
                    onChange={e => onValueChange(e, cell.id, Types[Types.CELLCHANGE])}
                />
            </>
      );
}