import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { Types } from '@common/models/Types';


interface TextProps {
    cell: Cell;
    onValueChange: any;
    formatCell: any;
}

export const TextComponent = ({cell, onValueChange, formatCell}: TextProps) => {
    return (
            <>
                <Typography style={{color: 'red'}}>
                    {cell.error}
                </Typography>
                <TextField 
                    label = 'Enter Data'
                   
                    value={cell.value}
                    onChange={e => onValueChange(e, cell.id, Types[Types.CELLCHANGE])}
                    helperText={formatCell(cell, Types[Types.HELPERTEXT])}
                />
            </>
      );
}