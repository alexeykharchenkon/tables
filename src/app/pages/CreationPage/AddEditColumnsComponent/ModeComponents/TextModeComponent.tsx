import React from 'react';
import Container from '@material-ui/core/Container';
import { Checkbox, FormControlLabel, TextField} from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { Types } from '@common/models/Types';
import { Column } from '@common/models/Column';

interface TextModeProps {
    OnValueChange: any;
    activeColumn: Column;
}

export const TextModeComponent = ({activeColumn, OnValueChange} : TextModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
            <Container>
                <h4>Forbidden Symbols</h4>
                    <TextField 
                        multiline
                        rows={1}
                        style={{width: '100%', marginBottom: '10px'}}
                        name="forbiddenSymbols"
                        label="Enter Symbols Separeted by Comma"
                        value={activeColumn.forbiddenSymbols}
                        onChange={e => OnValueChange(e, Types[Types.FORRBIDDENCHANGE])}
                    />
            </Container>
            <Container>
                <h4>Max Field Length</h4>
                <TextField 
                        type="number"
                        label="Enter Max Filed Length"
                        name="maxLength"
                        value={activeColumn.maxLength}
                        onChange={e => OnValueChange(e, Types[Types.MAXLENGTHCHANGE])}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isRequired"
                            checked={activeColumn.isRequired}
                            onChange={e => OnValueChange(e, Types[Types.ISREQUIREDCHANGE])}
                    /> 
                    }
                    label="Is Required"
                /> 
        </Container>
    </Container>
    );
}