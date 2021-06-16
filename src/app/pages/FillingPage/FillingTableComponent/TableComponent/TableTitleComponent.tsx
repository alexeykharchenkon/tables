import React from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton, Container, Typography} from '@material-ui/core';
import { useStyles } from "../../../../common/styles/styles"
import { TableModel } from '../../../../common/models/TableModel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


interface CProps {
    table: TableModel;
    addRow: any;
}

export const TableTitleComponent = observer(({table, addRow}: CProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingTableTitle}>
            <Typography variant="h6" id="tableTitle">
                {table.title}
            </Typography>
            <IconButton onClick={() => addRow(table.id)}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Container>
      );
});