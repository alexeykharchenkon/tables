import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { Types } from '@common/models/Types';


interface TextProps {
    cell: Cell;
    onValueChange: any;
    tableId: string;
    formatCell: any;
}

export const TextComponent = ({cell, onValueChange, tableId, formatCell}: TextProps) => {    
    return (
            <>
                <Typography style={{color: 'red'}}>
                    {cell.error}
                </Typography>
                <TextField 
                    label = 'Enter Data'
                    value={cell.value}
                    onChange={e => onValueChange(e, tableId, "", "", cell.id, cell.type, Types[Types.CELLCHANGE])}
                    helperText={formatCell(cell, Types[Types.HELPERTEXT])}
                />
            </>
      );
}