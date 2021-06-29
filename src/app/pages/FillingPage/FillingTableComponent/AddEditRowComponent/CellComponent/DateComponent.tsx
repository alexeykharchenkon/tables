import React from 'react';
import 'date-fns';
import { Cell } from '@common/models/Cell';
import { DataType } from '@common/models/DataType';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';  
import MomentUtils from "@date-io/moment";
import moment from "moment";

interface DateProps {
    cell: Cell;
    tableId: string;
    handleDateChange: any;
}

export const DateComponent = ({cell, tableId, handleDateChange}: DateProps) => {    
        return (
        <>
            {cell.type === DataType[DataType.DatePicker] &&
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        format={cell.dateFormat}
                        value={cell.value}
                        onChange={ e => handleDateChange(e, cell.id, tableId, cell.type)}
                    />
                </MuiPickersUtilsProvider>
            }
         </>
      );
}