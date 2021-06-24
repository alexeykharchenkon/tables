import React from 'react';
import { Table} from '@material-ui/core';
import { TableBodyComponent } from './TableBodyComponent';
import { TableHeadComponent } from './TableHeadComponent';
import { AdditionalTable } from '@app/common/models/AdditionalTable';
import { TableData } from '@app/common/models/TableData';


interface TableProps {
    table: AdditionalTable;
    saveRow: any;
    cellValueChange: any;
    editRow: any;
    deleteRow: any;
    tabData: TableData;
    activeTableId: string;
}

export const TableComponent = React.memo(({table, saveRow, 
    cellValueChange, editRow, deleteRow, tabData, activeTableId}: TableProps) => {
        return (
        <Table size="small" aria-label="a dense table">
            <TableHeadComponent table={table}/>
            <TableBodyComponent
                table={table}
                saveRow={saveRow}
                cellValueChange={cellValueChange}
                editRow={editRow}
                deleteRow={deleteRow}
                tabData = {tabData}
                activeTableId = {activeTableId}
            />
        </Table>
      );
});