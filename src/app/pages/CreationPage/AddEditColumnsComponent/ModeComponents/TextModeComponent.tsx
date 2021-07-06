import React from 'react';
import Container from '@material-ui/core/Container';
import { Checkbox, FormControlLabel, TextField} from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { AdditionalTable } from '@common/models/AdditionalTable';
import { Types } from '@common/models/Types';

interface TextModeProps {
    table: AdditionalTable;
    forbiddenSymbols: string;
    isRequired: boolean;
    maxLength: string;
    OnValueChange: any;
}

export const TextModeComponent = ({table, forbiddenSymbols, 
    isRequired, OnValueChange, maxLength} : TextModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
            <Container>
                <h4>Forbidden Symbols</h4>
                    <TextField 
                        multiline
                        rows={1}
                        style={{width: '100%', marginBottom: '10px'}}
                        label="Enter Symbols Separeted by Comma"
                        value={forbiddenSymbols}
                        onChange={e => OnValueChange(e, table.id, Types[Types.FORRBIDDENCHANGE])}
                    />
            </Container>
            <Container>
                <h4>Max Field Length</h4>
                <TextField 
                        type="number"
                        label="Enter Max Filed Length"
                        value={maxLength}
                        onChange={e => OnValueChange(e, table.id, Types[Types.MAXLENGTHCHANGE])}
                />
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