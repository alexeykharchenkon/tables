import React from 'react';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles"
import { TableModel } from "@common/models/TableModel";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Column } from '@common/models/Column';


interface TableRowProps {
    table: TableModel;
    deleteColumn: any;
    editColumn: any;
    col: Column;
    label: string;
    type: string;
}

export const TableRowComponent = ({table, deleteColumn, 
    editColumn, col, label, type} : TableRowProps) => {
    const classes = useStyles();

    return (
        <TableRow  className={classes.tableCoRow}>
            <TableCell>{label}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>
                <IconButton 
                    style={{marginRight:'5x'}}
                    onClick={() => deleteColumn(table.id, col.id)}
                >
                     <DeleteIcon />
                </IconButton>
                <IconButton 
                    onClick={() => editColumn(table.id, col.id, col.label, col.type, col.multySelectMode)}
                >
                    <EditIcon />
                </IconButton>
            </TableCell>
        </TableRow>            
    );
}