import React from 'react';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { AddEditRowComponent } from '../AddEditRowComponent/AddEditRowComponent';
import { EditDeleteComponent } from '../EditDeleteComponent/EditDeleteComponent';
import { CellComponent } from '../CellComponent/CellComponent';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { TableData } from '@app/common/models/TableData';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';


interface TableBodyProps {
    table: AdditionalTable;
    saveRow: any;
    onValueChange: any;
    editRow: any;
    deleteRow: any;
    tabData: TableData;
    activeTableId: string;
    cells: Cell[];
    rows: Row[];
    formatDate: any;
    formatSelect: any;
    helperText: any;
    cancelAddRow: any;
}

export const TableBodyComponent = ({table, saveRow,
    onValueChange, editRow, deleteRow, tabData, activeTableId,
   cells, rows, formatDate, formatSelect, helperText,
   cancelAddRow}: TableBodyProps) => {
    return (
            <TableBody>
                {table.addEditRowMode && activeTableId === tabData.id && 
                <AddEditRowComponent 
                    table={table} 
                    tabData={tabData}
                    saveRow={saveRow} 
                    onValueChange={onValueChange}
                    cells = {cells}
                    helperText={helperText}
                    cancelAddRow={cancelAddRow}
                />}  
                {rows && rows.map(row => (
                     <TableRow key={row.id}>
                         {row.cells.map(cell => (
                            <TableCell key={cell.id}>  
                                <CellComponent 
                                    cell={cell}
                                    formatDate={formatDate}
                                    formatSelect={formatSelect}
                                    onValueChange={onValueChange}
                                    tableId={table.id}
                                    tableDataId = {tabData.id}
                                    rowId ={row.id}
                                />
                            </TableCell>
                         ))}
                         <EditDeleteComponent 
                            table={table}
                            tabData={tabData}
                            row={row}
                            editRow={editRow}
                            deleteRow={deleteRow}
                         />
                     </TableRow>
                ))}   
            </TableBody>
      );
}