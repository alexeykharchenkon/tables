import React from 'react';
import { Table} from '@material-ui/core';
import { TableModel } from '@common/models/TableModel';
import { Row } from '@common/models/Row';
import { TableBodyComponent } from './TableBodyComponent';
import { TableHeadComponent } from './TableHeadComponent';


interface TableProps {
    table: TableModel;
    saveRow: any;
    activeRow: Row;
    cellValueChange: any;
    addEditRowMode: boolean;
    editRow: any;
    deleteRow: any;
}

export const TableComponent = React.memo(({table, saveRow, activeRow, 
    cellValueChange, addEditRowMode, editRow, deleteRow}: TableProps) => {
        return (
        <Table size="small" aria-label="a dense table">
            <TableHeadComponent table={table}/>
            <TableBodyComponent
                table={table}
                saveRow={saveRow}
                activeRow={activeRow}
                cellValueChange={cellValueChange}
                addEditRowMode={addEditRowMode}  
                editRow={editRow}
                deleteRow={deleteRow}
            />
        </Table>
      );
});