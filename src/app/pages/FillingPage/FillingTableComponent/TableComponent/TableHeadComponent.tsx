import React from 'react';
import { TableCell, TableRow, TableHead} from '@material-ui/core';
import { useStyles } from "@pages/FillingPage/common/styles/styles";
import { TableModel } from '@common/models/TableModel';


interface TableHeadProps {
    table: TableModel;
}

export const TableHeadComponent = React.memo(({table}: TableHeadProps) => {
    const classes = useStyles();
    return (
            <TableHead className={classes.fillingTableCoHead}>
                <TableRow> 
                    {table.columns.map(col => (
                        <TableCell key={col.id}>{col.label}</TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
      );
});