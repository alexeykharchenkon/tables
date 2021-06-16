import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { TextField, IconButton } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
                <IconButton 
                    onClick={() => createTable()}
                >
                    <AddCircleOutlineIcon />
                </IconButton>
            </Container>
      );
});