import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


interface EditDeleteProps {
    tableId: string;
    rowId: string;
    editRow: any;
    deleteRow: any;
}

export const EditDeleteComponent = ({tableId, rowId,
    editRow, deleteRow}: EditDeleteProps) => {
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
}