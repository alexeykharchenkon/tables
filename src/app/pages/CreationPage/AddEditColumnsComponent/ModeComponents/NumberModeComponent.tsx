import React from 'react';
import Container from '@material-ui/core/Container';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';

interface NumberModeProps {
    table: AdditionalTable;
    isRequired: boolean;
    minValue: number;
    maxValue: number;
    OnValueChange: any;
}

export const NumberModeComponent = ({table, isRequired, OnValueChange,
    minValue, maxValue} : NumberModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addNumber}>
           <Container>
                <h4>Min Value</h4>
                <TextField 
                    type="number"
                    label="Enter Min Value"
                    value={minValue}
                    onChange={e => OnValueChange(e, table.id, "MINVALUECHANGE")}
                />
            </Container>
            <Container>
                <h4>Max Value</h4>
                <TextField 
                    type="number"
                    label="Enter Max Value"
                    value={maxValue}
                    onChange={e => OnValueChange(e, table.id, "MAXVALUECHANGE")}
                />
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