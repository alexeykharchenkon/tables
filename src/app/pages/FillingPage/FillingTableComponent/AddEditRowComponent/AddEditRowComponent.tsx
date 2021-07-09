import React from 'react';
import { IconButton, TableCell, TableRow} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CellComponent } from './CellComponent/CellComponent';
import { Cell } from '@common/models/Cell';
import { Types } from '@common/models/Types';

interface AddEditRowProps {
    crudRow: any;
    onValueChange: any;
    activeCells: Cell[];
    formatCell: any;
}

export const AddEditRowComponent = ({crudRow, onValueChange, activeCells, 
    formatCell}: AddEditRowProps) => {
    return (
        <TableRow>
            {activeCells?.map(cell => (
               <TableCell key={cell.id}>
                   <CellComponent
                        cell = {cell} 
                        onValueChange = {onValueChange}
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