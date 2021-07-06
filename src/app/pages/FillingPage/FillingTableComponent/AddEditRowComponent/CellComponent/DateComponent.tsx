import React from 'react';
import 'date-fns';
import { Cell } from '@common/models/Cell';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';  
import { Typography } from '@material-ui/core';
import { Types } from '@common/models/Types';

interface DateProps {
    cell: Cell;
    tableId: string;
    onValueChange: any;
    helperText: any;
}

export const DateComponent = ({cell, tableId, onValueChange,
    helperText}: DateProps) => {    
        return (
            <>
                <Typography style={{color: 'red'}}>
                        {cell.error}
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        format={cell.dateFormat}
                        value={cell.value}
                        helperText={helperText(cell)}
                        onChange={ e => onValueChange(e, tableId, "", "", cell.id, cell.type,Types[Types.DATECHANGE])}
                    />
                </MuiPickersUtilsProvider>
            </>
      );
}