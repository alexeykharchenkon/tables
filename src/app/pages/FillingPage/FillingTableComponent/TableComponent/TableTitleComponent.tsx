import React from 'react';
import { IconButton, Container, Typography} from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { TableModel } from '@common/models/TableModel';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { TableData } from '@app/common/models/TableData';



interface TableTitleProps {
    table: TableModel;
    addRow: any;
    tabData: TableData;
}

export const TableTitleComponent = React.memo(({table, addRow, tabData}: TableTitleProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingTableTitle}>
            <Typography variant="h6" id="tableTitle">
                {tabData.title}
            </Typography>
            <IconButton onClick={() => addRow(table.id, tabData.id)}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Container>
      );
});