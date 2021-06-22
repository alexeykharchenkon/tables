import React from 'react';
import { IconButton, TableCell, TableRow} from '@material-ui/core';
import { TableModel } from '@common/models/TableModel';
import SaveIcon from '@material-ui/icons/Save';
import { Row } from '@common/models/Row';
import { CellComponent } from './CellComponent';

interface AddEditRowProps {
    table: TableModel;
    saveRow: any;
    activeRow: Row;
    cellValueChange: any;
}

export const AddEditRowComponent =({table, saveRow, activeRow, 
    cellValueChange}: AddEditRowProps) => {
    return (
        <TableRow>
            {activeRow.cells.map(cell => (
               <TableCell key={cell.id}>
                   <CellComponent
                        cell = {cell} 
                        cellValueChange = {cellValueChange}
                   />
               </TableCell>
            ))}
            <TableCell>
                <IconButton 
                    aria-label="save"
                    onClick={() => saveRow(table.id)}
                >
                    <SaveIcon />
                </IconButton>
            </TableCell>
        </TableRow>
      );
}