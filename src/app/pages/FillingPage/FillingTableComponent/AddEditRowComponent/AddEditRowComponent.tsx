import React from 'react';
import { IconButton, TableCell, TableRow} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CellComponent } from './CellComponent/CellComponent';
import { Cell } from '@common/models/Cell';
import { DataTable } from '@common/models/DataTable';
import { Types } from '@common/models/Types';

interface AddEditRowProps {
    table: DataTable;
    crudRow: any;
    onValueChange: any;
    cells: Cell[];
    formatCell: any;
}

export const AddEditRowComponent = ({table, crudRow, onValueChange, cells, 
    formatCell}: AddEditRowProps) => {
    return (
        <TableRow>
            {cells.map(cell => (
               <TableCell key={cell.id}>
                   <CellComponent
                        cell = {cell} 
                        onValueChange = {onValueChange}
                        tableId={table.id}
                        formatCell={formatCell}
                   />
               </TableCell>
            ))}
            <TableCell>
                <IconButton 
                    aria-label="save"
                    onClick={() => crudRow("", Types[Types.SAVEROW])}
                >
                    <SaveIcon />
                </IconButton>
                <IconButton 
                    aria-label="cancel"
                    onClick={() => crudRow("", Types[Types.CANCELADDROW])}
                >
                    <CancelIcon />
                </IconButton>
            </TableCell>
        </TableRow>
      );
}