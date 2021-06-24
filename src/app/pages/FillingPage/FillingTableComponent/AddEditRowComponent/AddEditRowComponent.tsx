import React from 'react';
import { IconButton, TableCell, TableRow} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { CellComponent } from './CellComponent';
import { AdditionalTable } from '@app/common/models/AdditionalTable';
import { TableData } from '@app/common/models/TableData';

interface AddEditRowProps {
    table: AdditionalTable;
    saveRow: any;
    cellValueChange: any;
    tabData: TableData;
}

export const AddEditRowComponent =({table, saveRow, 
    cellValueChange, tabData}: AddEditRowProps) => {
    return (
        <TableRow>
            {table.activeRow.cells.map(cell => (
               <TableCell key={cell.id}>
                   <CellComponent
                        cell = {cell} 
                        cellValueChange = {cellValueChange}
                        tableId={table.id}
                        tabDataId={tabData.id}
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
            </TableCell>
        </TableRow>
      );
}