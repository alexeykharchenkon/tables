import React from 'react';
import { Table, TableCell, TableRow, TableHead} from '@material-ui/core';
import { TableBodyComponent } from './TableBodyComponent';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';
import { Column } from '@common/models/Column';
import { DataTable } from '@common/models/DataTable';
import { useStyles } from "@pages/FillingPage/common/styles/styles";


interface TableProps {
    table: DataTable;
    crudRow: any;
    onValueChange: any;
    cells: Cell[];
    activeCells: Cell[];
    rows: Row[];
    columns: Column[];
    formatCell: any;
    addEditRowMode: boolean;
}

export const TableComponent = React.memo(({table, crudRow, onValueChange, 
    cells, rows, columns, activeCells, formatCell, addEditRowMode}: TableProps) => {
        const classes = useStyles();
        return (
        <Table size="small">
            <TableHead className={classes.fillingTableCoHead}>
                <TableRow> 
                    {columns.map(col => (
                        col.schemaId === table.schemaId &&
                        <TableCell key={col.id}>{col.label}</TableCell>
                    ))}
                    <TableCell>Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBodyComponent
                table={table}
                crudRow={crudRow}
                onValueChange={onValueChange}
                cells={cells}
                rows={rows}
                formatCell={formatCell}
                addEditRowMode={addEditRowMode}
                activeCells={activeCells}
                columns={columns}
            />
        </Table>
      );
});