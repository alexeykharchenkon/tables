import React from 'react';
import Container from '@material-ui/core/Container';
import { Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { Types } from '@common/models/Types';
import { Column } from '@common/models/Column';

interface NumberModeProps {
    activeColumn: Column;
    OnValueChange: any;
}

export const NumberModeComponent = ({OnValueChange, activeColumn} : NumberModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addNumber}>
           <Container>
                <h4>Min Value</h4>
                <TextField 
                    type="number"
                    label="Enter Min Value"
                    name="minValue"
                    value={activeColumn.minValue}
                    onChange={e => OnValueChange(e, Types[Types.MINVALUECHANGE])}
                />
            </Container>
            <Container>
                <h4>Max Value</h4>
                <TextField 
                    type="number"
                    label="Enter Max Value"
                    name="maxValue"
                    value={activeColumn.maxValue}
                    onChange={e => OnValueChange(e, Types[Types.MAXVALUECHANGE])}
                />
            </Container>
            <Container>
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isRequired"
                            checked={activeColumn.isRequired==="true"? true: false}
                            onChange={e => OnValueChange(e, Types[Types.ISREQUIREDCHANGE])}
                    /> 
                    }
                    label="Is Required"
                /> 
           </Container>
        </Container>
    );
}