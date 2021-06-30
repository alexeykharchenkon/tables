import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';
import { FormControl, InputLabel, Select } from '@material-ui/core';

interface DateModeProps {
    table: AdditionalTable;
    dateFormatValueChange: any;
    dateFormat: string;
}

export const DateModeComponent = ({table, dateFormatValueChange, dateFormat}: DateModeProps) => {
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
                        value={ dateFormat }
                        onChange={e => dateFormatValueChange(e.target.value, table.id)}
                    >
                        <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                        <option value="MM/dd/yyyy">MM/dd/yyyy</option>
                        <option value="yyyy/MM/dd">yyyy/MM/dd</option>
                        <option value="yyyy/dd/MM">yyyy/dd/MM</option>
                    </Select> 
                </FormControl>
           </Container>
        </Container>
    );
}