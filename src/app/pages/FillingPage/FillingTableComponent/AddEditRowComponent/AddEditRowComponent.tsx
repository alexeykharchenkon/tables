import React from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton, TableCell, TableRow, TextField } from '@material-ui/core';
import { TableModel } from '../../../../common/models/TableModel';
import SaveIcon from '@material-ui/icons/Save';
import { Row } from '../../../../common/models/Row';


interface CProps {
    table: TableModel;
    saveRow: any;
    activeRow: Row;
    cellValueChange: any;
}

export const AddEditRowComponent = observer(({table, saveRow, activeRow, 
    cellValueChange}: CProps) => {
    return (
        <TableRow>
            {activeRow.cells.map(cell => (
               <TableCell key={cell.id}>
                    <TextField 
                        label = 'Enter Data'
                        value={cell.value}
                        onChange={e => cellValueChange(e.target.value, cell.id)}
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
});