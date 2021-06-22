import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { TableModel } from '@common/models/TableModel';
import { AddEditRowComponent } from '../AddEditRowComponent/AddEditRowComponent';
import { Row } from '@common/models/Row';
import { EditDeleteComponent } from '../EditDeleteComponent/EditDeleteComponent';
import { CellComponent } from '../CellComponent/CellComponent';


interface TableBodyProps {
    table: TableModel;
    saveRow: any;
    activeRow: Row;
    cellValueChange: any;
    addEditRowMode: boolean;
    editRow: any;
    deleteRow: any;
}

export const TableBodyComponent = observer(({table, saveRow, activeRow, 
    cellValueChange, addEditRowMode, editRow, deleteRow}: TableBodyProps) => {
    return (
            <TableBody>
                {addEditRowMode && <AddEditRowComponent 
                    table={table} 
                    saveRow={saveRow} 
                    activeRow={activeRow}
                    cellValueChange={cellValueChange}
                />}  
                {table.rows && table.rows.map(row => (
                     <TableRow key={row.id}>
                         {row.cells.map(cell => (
                            <TableCell key={cell.id}>  
                                <CellComponent cell={cell}/>
                            </TableCell>
                         ))}
                         <EditDeleteComponent 
                            table={table}
                            row={row}
                            editRow={editRow}
                            deleteRow={deleteRow}
                         />
                     </TableRow>
                ))}   
            </TableBody>
      );
});