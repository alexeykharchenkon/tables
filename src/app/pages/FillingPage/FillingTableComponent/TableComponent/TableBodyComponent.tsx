import React from 'react';
import { TableCell, TableRow, TableBody } from '@material-ui/core';
import { AddEditRowComponent } from '../AddEditRowComponent/AddEditRowComponent';
import { EditDeleteComponent } from '../EditDeleteComponent/EditDeleteComponent';
import { CellComponent } from '../CellComponent/CellComponent';
import { AdditionalTable } from '@app/common/models/AdditionalTable';
import { TableData } from '@app/common/models/TableData';
import { Cell } from '@app/common/models/Cell';
import { Row } from '@app/common/models/Row';


interface TableBodyProps {
    table: AdditionalTable;
    saveRow: any;
    cellValueChange: any;
    editRow: any;
    deleteRow: any;
    tabData: TableData;
    activeTableId: string;
    selectValueChange: any;
    checkboxValueChange: any;
    cells: Cell[];
    rows: Row[];
    handleDateChange: any;
}

export const TableBodyComponent = ({table, saveRow,
    cellValueChange, editRow, deleteRow, tabData, activeTableId,
    selectValueChange, checkboxValueChange, cells, rows, handleDateChange}: TableBodyProps) => {
    return (
            <TableBody>
                {table.addEditRowMode && activeTableId === tabData.id && 
                <AddEditRowComponent 
                    table={table} 
                    tabData={tabData}
                    saveRow={saveRow} 
                    cellValueChange={cellValueChange}
                    selectValueChange={selectValueChange}
                    checkboxValueChange={checkboxValueChange}
                    cells = {cells}
                    handleDateChange ={handleDateChange}
                />}  
                {rows && rows.map(row => (
                     <TableRow key={row.id}>
                         {row.cells.map(cell => (
                            <TableCell key={cell.id}>  
                                <CellComponent 
                                    cell={cell}
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