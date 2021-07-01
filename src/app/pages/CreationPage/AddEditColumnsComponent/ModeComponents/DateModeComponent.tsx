import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';
import { Checkbox, FormControlLabel, FormControl, InputLabel, Select } from '@material-ui/core';

interface DateModeProps {
    table: AdditionalTable;
    dateFormat: string;
    isRequired: boolean;
    OnValueChange: any;
}

export const DateModeComponent = ({table, dateFormat,
    isRequired, OnValueChange}: DateModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addDate}>
             <Container>
                <h4>Choose Date Format</h4>
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Date Format</InputLabel> 
                    <Select
                        native
                        style={{marginBottom:'10px'}}
                        value={ dateFormat }
                        onChange={e => OnValueChange(e, table.id, "DATEFORMATCHANGE")}
                    >
                        <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                        <option value="MM/dd/yyyy">MM/dd/yyyy</option>
                        <option value="yyyy/MM/dd">yyyy/MM/dd</option>
                        <option value="yyyy/dd/MM">yyyy/dd/MM</option>
                    </Select> 
                </FormControl>
            </Container>
            <Container>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isRequired}
                            onChange={e => OnValueChange(e, table.id, "ISREQUIREDCHANGE")}
                    /> 
                    }
                    label="Is Required"
                /> 
           </Container>
        </Container>
    );
}