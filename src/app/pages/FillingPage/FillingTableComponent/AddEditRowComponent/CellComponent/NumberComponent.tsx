import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Cell } from '@common/models/Cell';
import { Types } from '@common/models/Types';


interface NumberProps {
    cell: Cell;
    onValueChange: any;
    tableId: string;
    formatCell: any;
}

export const NumberComponent = ({cell, onValueChange, tableId, formatCell}: NumberProps) => {    
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
                    onChange={e => onValueChange(e, tableId, "", "", cell.id, cell.type, Types[Types.CELLCHANGE])}
                />
            </>
      );
}