import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@common/styles/styles";
import { AdditionalTable } from '@app/common/models/AdditionalTable';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton, TextField } from '@material-ui/core';

interface FillingTableHeadProps {
    table: AdditionalTable;
    addTable: any;
    titleValue: string;
    onValueChange: any;
}


export const FillingTableHeadComponent = ({table, addTable, titleValue, onValueChange}: FillingTableHeadProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingHeadComponent}>
            <h2>{table.title} Tables</h2> 
            <Container className={classes.fillingHeadAddTableComponent}>
                <TextField 
                    label = 'Enter Table Title'
                    value={titleValue}
                    onChange={e => onValueChange(e, "", "", "", "", "", "TITLECHANGE")}
                />
                <IconButton onClick={() => addTable(table.id)}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Container>
        </Container>
      );
}