import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@pages/FillingPage/common/styles/styles"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { IconButton, TextField } from '@material-ui/core';
import { Types } from '@common/models/Types';

interface AddTableProps {
    addDeleteTable: any;
    titleValue: string;
    onValueChange: any;
}


export const AddTableComponent = ({addDeleteTable, titleValue, onValueChange}: AddTableProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingHeadComponent}>
            <h3>Add New Table</h3> 
            <Container className={classes.fillingHeadAddTableComponent}>
                <TextField 
                    label = 'Enter Table Title'
                    value={titleValue}
                    onChange={e => onValueChange(e, "", Types[Types.TITLECHANGE])}
                />
                <IconButton onClick={() => addDeleteTable(Types[Types.ADDTABLE])}>
                    <AddCircleOutlineIcon />
                </IconButton>
            </Container>
        </Container>
      );
}