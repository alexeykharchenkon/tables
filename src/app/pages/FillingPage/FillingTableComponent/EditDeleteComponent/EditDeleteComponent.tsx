import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


interface CProps {
    tableId: string;
    rowId: string;
    editRow: any;
    deleteRow: any;
}

export const EditDeleteComponent = observer(({tableId, rowId,
    editRow, deleteRow}: CProps) => {
    return (
        <TableCell>
            <IconButton 
                onClick={() => editRow(tableId, rowId)}
            >
                <EditIcon />
            </IconButton>
            <IconButton 
                 onClick={() => deleteRow(tableId, rowId)}
            >
                <DeleteIcon />
            </IconButton>
        </TableCell>
      );
});