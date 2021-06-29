import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { Column } from '@common/models/Column';


interface TableRowProps {
    col: Column;
}

export const TableRowComponent = ({col} : TableRowProps) => {
    return (
        <TableRow>
            <TableCell>{col.label}</TableCell>
            <TableCell>{col.type}</TableCell>
        </TableRow>            
    );
}