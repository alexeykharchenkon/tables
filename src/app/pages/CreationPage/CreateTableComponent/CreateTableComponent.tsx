import React from 'react';
import Container from '@material-ui/core/Container';
import { TextField, IconButton } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

interface CreateTableProps {
    tableTitleValue: string;
    OnValueChange: any;
    createTable: any;
}

export const CreateTableComponent = React.memo(({tableTitleValue, 
    OnValueChange, createTable} : CreateTableProps) => {
    const classes = useStyles();
    return (
            <Container className={classes.creationCoUp}>
                <TextField 
                    label="Enter Table Title" 
                    value={tableTitleValue}
                    onChange={e => OnValueChange(e, "", "TITLECHANGE")}
                />
                <IconButton 
                    onClick={() => createTable()}
                >
                    <AddCircleOutlineIcon />
                </IconButton>
            </Container>
      );
});