import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { Button, TextField } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"

interface CProps {
    tableTitleValue: string;
    tableTitleValueOnChange: any;
    createTable: any;
}

export const CreateTableComponent = observer(({
    tableTitleValue, tableTitleValueOnChange, createTable} : CProps) => {
    const classes = useStyles();

    return (
            <Container className={classes.creationCoUp}>
                <TextField 
                    label="Enter Table Title" 
                    value={tableTitleValue}
                    onChange={e => tableTitleValueOnChange(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => createTable()}
                > Create New Table </Button> 
            </Container>
      );
});