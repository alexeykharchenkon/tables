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
    selectValueChange: any;
}

export const AddEditRowComponent =({table, saveRow, 
    cellValueChange, tabData, selectValueChange}: AddEditRowProps) => {
    return (
        <TableRow>
            {table.activeRow.cells.map(cell => (
               <TableCell key={cell.id}>
                   <CellComponent
                        cell = {cell} 
                        cellValueChange = {cellValueChange}
                        tableId={table.id}
                        tabDataId={tabData.id}
                        selectValueChange={selectValueChange}
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