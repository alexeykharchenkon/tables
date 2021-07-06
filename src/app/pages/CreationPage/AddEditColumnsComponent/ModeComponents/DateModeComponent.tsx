import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { AdditionalTable } from '@common/models/AdditionalTable';
import { Checkbox, FormControlLabel, FormControl, InputLabel, Select } from '@material-ui/core';
import { Types } from '@common/models/Types';

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
                        onChange={e => OnValueChange(e, table.id, Types[Types.DATEFORMATCHANGE])}
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
                            onChange={e => OnValueChange(e, table.id, Types[Types.ISREQUIREDCHANGE])}
                    /> 
                    }
                    label="Is Required"
                /> 
           </Container>
        </Container>
    );
}