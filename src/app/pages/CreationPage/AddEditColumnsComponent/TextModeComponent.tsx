import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { TextField} from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { AdditionalTable } from '@common/models/AdditionalTable';

interface TextModeProps {
    table: AdditionalTable;
    forbiddenValueChange: any;
}

export const TextModeComponent = observer(({table, forbiddenValueChange} : TextModeProps) => {
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
                    value={table.forbiddenSymbols}
                    onChange={e => forbiddenValueChange(e.target.value, table.id)}
                />
           </Container>
        </Container>
    );
});