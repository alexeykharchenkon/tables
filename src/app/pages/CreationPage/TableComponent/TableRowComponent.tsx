import React from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Column } from '@common/models/Column';


interface TableRowProps {
    deleteColumn: any;
    editColumn: any;
    col: Column;
}

export const TableRowComponent = ({deleteColumn, editColumn, col} : TableRowProps) => {
    const classes = useStyles();

    return (
        <TableRow  className={classes.tableCoRow}>
            <TableCell>{col.label}</TableCell>
            <TableCell>{col.type}</TableCell>
            <TableCell>
                <IconButton 
                    style={{marginRight:'5x'}}
                    onClick={() => deleteColumn(col.id)}
                >
                     <DeleteIcon />
                </IconButton>
                <IconButton 
                    onClick={() => editColumn(col.id)}
                >
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>            
    );
}