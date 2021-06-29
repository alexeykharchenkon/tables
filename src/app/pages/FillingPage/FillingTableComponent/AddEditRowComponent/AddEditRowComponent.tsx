import React from 'react';
import { IconButton, TableCell, TableRow} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { CellComponent } from './CellComponent/CellComponent';
import { AdditionalTable } from '@app/common/models/AdditionalTable';
import { TableData } from '@common/models/TableData';
import { Cell } from '@app/common/models/Cell';

interface AddEditRowProps {
    table: AdditionalTable;
    saveRow: any;
    cellValueChange: any;
    tabData: TableData;
    selectValueChange: any;
    checkboxValueChange: any;
    cells: Cell[];
    handleDateChange: any;
}

export const AddEditRowComponent = ({table, saveRow, 
    cellValueChange, tabData, selectValueChange, checkboxValueChange,
    cells, handleDateChange}: AddEditRowProps) => {
    return (
        <TableRow>
            {cells.map(cell => (
               <TableCell key={cell.id}>
                   <CellComponent
                        cell = {cell} 
                        cellValueChange = {cellValueChange}
                        tableId={table.id}
                        selectValueChange={selectValueChange}
                        checkboxValueChange={checkboxValueChange}
                        handleDateChange={handleDateChange}
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