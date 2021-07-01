import React from 'react';
import { IconButton, TableCell, TableRow} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import { CellComponent } from './CellComponent/CellComponent';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { TableData } from '@common/models/TableData';
import { Cell } from '@common/models/Cell';

interface AddEditRowProps {
    table: AdditionalTable;
    saveRow: any;
    onValueChange: any;
    tabData: TableData;
    cells: Cell[];
    helperText: any;
    cancelAddRow: any;
}

export const AddEditRowComponent = ({table, saveRow, 
    onValueChange, tabData, cells, helperText, cancelAddRow}: AddEditRowProps) => {
    return (
        <TableRow>
            {cells.map(cell => (
               <TableCell key={cell.id}>
                   <CellComponent
                        cell = {cell} 
                        onValueChange = {onValueChange}
                        tableId={table.id}
                        helperText={helperText}
                   />
               </TableCell>
            ))}
            <TableCell>
                <IconButton 
                    aria-label="save"
                    onClick={() => saveRow(table.id, tabData.id)}
                >
                    <SaveIcon />
                </IconButton>
                <IconButton 
                    aria-label="cancel"
                    onClick={() => cancelAddRow(table.id)}
                >
                    <CancelIcon />
                </IconButton>
            </TableCell>
        </TableRow>
      );
}