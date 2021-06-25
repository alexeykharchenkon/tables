import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';
import { FormControl, InputLabel, Select } from '@material-ui/core';

interface DateModeProps {
    table: AdditionalTable;
    dateFormatValueChange: any;
}

export const DateModeComponent = observer(({table, dateFormatValueChange}: DateModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
             <Container>
                <h3>Choose Date Format</h3>
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Date Format</InputLabel> 
                    <Select
                        native
                        style={{marginBottom:'10px'}}
                        value={ table.dateFormat }
                        onChange={e => dateFormatValueChange(e.target.value, table.id)}
                    >
                        <option value="date">Date</option>
                        <option value="datetime-local">Date and Time</option>
                        <option value="time">Time</option>
                    </Select> 
                </FormControl>
           </Container>
        </Container>
    );
});