import React from 'react';
import Container from '@material-ui/core/Container';
import { Checkbox, FormControlLabel, TextField} from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';

interface TextModeProps {
    table: AdditionalTable;
    forbiddenSymbols: string;
    isRequired: boolean;
    maxLength: number;
    OnValueChange: any;
}

export const TextModeComponent = ({table, forbiddenSymbols, 
    isRequired, OnValueChange, maxLength} : TextModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
           <Container>
                <h3>Forbidden Symbols</h3>
                <TextField 
                    multiline
                    rows={1}
                    style={{width: '100%', marginBottom: '10px'}}
                    label="Enter Forbidden Symbols Separeted by Comma"
                    value={forbiddenSymbols}
                    onChange={e => OnValueChange(e, table.id, "FORRBIDDENCHANGE")}
                />
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