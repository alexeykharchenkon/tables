import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableCell, TableRow } from '@material-ui/core';
import { DataType } from '../../../common/models/DataType';
import { Column } from '../../../common/models/Column';


interface CProps {
    col: Column;
}

export const TableRowComponent = observer(({col} : CProps) => {
    return (
        <TableRow>
            <TableCell>{col.label}</TableCell>
            <TableCell>{DataType[col.type]}</TableCell>
        </TableRow>            
    );
});