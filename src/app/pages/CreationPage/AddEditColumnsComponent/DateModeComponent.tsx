import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';
import { FormControl, InputLabel, Select } from '@material-ui/core';

interface DateModeProps {
    table: AdditionalTable;
}

export const DateModeComponent = observer(({table}: DateModeProps) => {
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
                    >
                        <option value="0"></option>
                        <option value="1"></option>
                    </Select> 
                </FormControl>
           </Container>
        </Container>
    );
});