import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableCell, TableRow, TableHead} from '@material-ui/core';
import { useStyles } from "../../../../common/styles/styles"
import { TableModel } from '../../../../common/models/TableModel';


interface CProps {
    table: TableModel;
}

export const TableHeadComponent = observer(({table}: CProps) => {
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