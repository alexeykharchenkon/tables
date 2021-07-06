import React from 'react';
import { Table} from '@material-ui/core';
import { TableBodyComponent } from './TableBodyComponent';
import { TableHeadComponent } from './TableHeadComponent';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { TableData } from '@common/models/TableData';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';


interface TableProps {
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

export const TableComponent = React.memo(({table, saveRow, 
    onValueChange, editRow, deleteRow, tabData, activeTableId,
    cells, rows, formatDate, formatSelect, helperText,
    cancelAddRow}: TableProps) => {
        return (
        <Table size="small">
            <TableHeadComponent table={table}/>
            <TableBodyComponent
                table={table}
                saveRow={saveRow}
                onValueChange={onValueChange}
                editRow={editRow}
                deleteRow={deleteRow}
                tabData = {tabData}
                activeTableId = {activeTableId}
                cells={cells}
                rows={rows}
                formatDate={formatDate}
                formatSelect={formatSelect}
                helperText={helperText}
                cancelAddRow={cancelAddRow}
            />
        </Table>
      );
});