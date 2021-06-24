import React from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { TableModel } from "@common/models/TableModel";
import { DataType } from '@common/models/DataType';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Column } from '@common/models/Column';


interface TableRowProps {
    table: TableModel;
    deleteColumn: any;
    editColumn: any;
    col: Column;
}

export const TableRowComponent = observer(({table, deleteColumn, 
    editColumn, col} : TableRowProps) => {
    const classes = useStyles();

    return (
        <TableRow  className={classes.tableCoRow}>
            <TableCell>{col.label}</TableCell>
            <TableCell>{DataType[col.type]}</TableCell>
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
});