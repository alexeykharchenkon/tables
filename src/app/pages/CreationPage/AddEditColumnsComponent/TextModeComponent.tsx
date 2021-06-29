import React from 'react';
import Container from '@material-ui/core/Container';
import { TextField} from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';

interface TextModeProps {
    table: AdditionalTable;
    forbiddenValueChange: any;
    forbiddenSymbols: string;
}

export const TextModeComponent = ({table, forbiddenValueChange,
    forbiddenSymbols} : TextModeProps) => {
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
                    onChange={e => forbiddenValueChange(e.target.value, table.id)}
                />
           </Container>
        </Container>
    );
}