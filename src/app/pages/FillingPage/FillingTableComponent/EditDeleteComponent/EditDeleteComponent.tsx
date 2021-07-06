import React from 'react';
import { TableCell, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Row } from '@common/models/Row';
import { TableModel } from '@common/models/TableModel';
import { TableData } from '@common/models/TableData';


interface EditDeleteProps {
    table: TableModel;
    row: Row;
    editRow: any;
    deleteRow: any;
    tabData: TableData;
}

export const EditDeleteComponent = ({table, row,
    editRow, deleteRow, tabData}: EditDeleteProps) => {
    return (
        <TableCell>
            <IconButton 
                onClick={() => editRow(table.id, tabData.id, row.id)}
            >
                <EditIcon />
            </IconButton>
            <IconButton 
                 onClick={() => deleteRow(table.id,tabData.id, row.id)}
            >
                <DeleteIcon />
            </IconButton>
        </TableCell>
      );
}