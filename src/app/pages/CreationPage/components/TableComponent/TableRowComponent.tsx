import React from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Column } from '@common/models/Column';
import { Types } from '@common/models/Types';

interface TableRowProps {
    crudColumn: any;
    col: Column;
}

export const TableRowComponent = ({crudColumn, col} : TableRowProps) => {
    const classes = useStyles();

    return (
        <TableRow  className={classes.tableCoRow}>
            <TableCell>{col.label}</TableCell>
            <TableCell>{col.type}</TableCell>
            <TableCell>
                <IconButton 
                    style={{marginRight:'5x'}}
                    onClick={() => crudColumn(Types[Types.DELETECOLUMN], col.id)}
                >
                     <DeleteIcon />
                </IconButton>
                <IconButton 
                    onClick={() => crudColumn(Types[Types.EDITCOLUMN], col.id)}
                >
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>            
    );
}