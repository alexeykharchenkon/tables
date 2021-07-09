import React from 'react';
import { TableCell, TableRow, TableBody, IconButton  } from '@material-ui/core';
import { AddEditRowComponent } from '../AddEditRowComponent/AddEditRowComponent';
import { CellComponent } from '../CellComponent/CellComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataTable } from '@common/models/DataTable';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';
import { Types } from '@common/models/Types';


interface TableBodyProps {
    table: DataTable;
    crudRow: any;
    onValueChange: any;
    cells: Cell[];
    activeCells: Cell[];
    rows: Row[];
    formatCell: any;
    addEditRowMode: boolean;
}

export const TableBodyComponent = ({table, cells, rows, crudRow, onValueChange, 
   formatCell, addEditRowMode, activeCells}: TableBodyProps) => {
    return (
            <TableBody>
                {addEditRowMode && 
                <AddEditRowComponent 
                    crudRow={crudRow} 
                    onValueChange={onValueChange}
                    formatCell={formatCell}
                    activeCells={activeCells}
                />}  
                {rows?.map(row => (
                    row.tableId === table.id &&
                     <TableRow key={row.id}>
                         {cells?.map(cell => (
                             cell.rowId === row.id &&
                                <TableCell key={cell.id}>  
                                    <CellComponent 
                                        cell={cell}
                                        formatCell={formatCell}
                                        onValueChange={onValueChange}
                                    />
                                </TableCell>
                         ))}
                         <TableCell>
                            <IconButton onClick={() => crudRow(row.id, Types[Types.EDITROW])}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => crudRow(row.id, Types[Types.DELETEROW])}>
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                     </TableRow>
                ))}   
            </TableBody>
      );
}