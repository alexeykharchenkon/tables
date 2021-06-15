import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, TextField } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import { TableModel } from '../../../common/models/TableModel';


interface CProps {
    table: TableModel;
}

export const AddRowComponent = observer(({table}: CProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.addRowFillingTable}>
            <TextField />
        </Container>
      );
});