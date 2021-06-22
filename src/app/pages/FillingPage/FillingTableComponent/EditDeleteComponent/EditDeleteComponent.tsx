import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Row } from '@app/common/models/Row';
import { TableModel } from '@app/common/models/TableModel';
import { observer } from 'mobx-react-lite';


interface EditDeleteProps {
    table: TableModel;
    row: Row;
    editRow: any;
    deleteRow: any;
}

export const EditDeleteComponent = observer(({table, row,
    editRow, deleteRow}: EditDeleteProps) => {
    return (
        <TableCell>
            <IconButton 
                onClick={() => editRow(table.id, row.id)}
            >
                <EditIcon />
            </IconButton>
            <IconButton 
                 onClick={() => deleteRow(table.id, row.id)}
            >
                <DeleteIcon />
            </IconButton>
        </TableCell>
      );
});