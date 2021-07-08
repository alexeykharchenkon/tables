import React from 'react';
import { IconButton, Container, Typography} from '@material-ui/core';
import { useStyles } from "@pages/FillingPage/common/styles/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { DataTable } from '@common/models/DataTable';
import { Types } from '@common/models/Types';

interface TableTitleProps {
    table: DataTable;
    crudRow: any;
}

export const TableTitleComponent = React.memo(({table, crudRow}: TableTitleProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingTableTitle}>
            <Typography variant="h6" id="tableTitle">
                {table.title}
            </Typography>
            <IconButton onClick={() => crudRow("", Types[Types.ADDROW])}>
                <AddCircleOutlineIcon />
            </IconButton>
        </Container>
      );
});