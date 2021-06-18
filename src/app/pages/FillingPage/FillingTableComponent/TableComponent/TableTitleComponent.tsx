import React from 'react';
import { IconButton, Container, Typography} from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { TableModel } from '@common/models/TableModel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


interface TableTitleProps {
    table: TableModel;
    addRow: any;
}

export const TableTitleComponent = React.memo(({table, addRow}: TableTitleProps) => {
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