import React from 'react';
import Container from '@material-ui/core/Container';
import { Checkbox, FormControlLabel } from '@material-ui/core';
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
        <Container className={classes.addSelect}>
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