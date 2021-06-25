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
    selectValueChange: any;
    checkboxValueChange: any;
}

export const TableComponent = React.memo(({table, saveRow, 
    cellValueChange, editRow, deleteRow, tabData, activeTableId,
    selectValueChange, checkboxValueChange}: TableProps) => {
        return (
        <Table size="small">
            <TableHeadComponent table={table}/>
            <TableBodyComponent
                table={table}
                saveRow={saveRow}
                cellValueChange={cellValueChange}
                editRow={editRow}
                deleteRow={deleteRow}
                tabData = {tabData}
                activeTableId = {activeTableId}
                selectValueChange ={selectValueChange}
                checkboxValueChange= {checkboxValueChange}
            />
        </Table>
      );
});