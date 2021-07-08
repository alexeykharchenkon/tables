import React from 'react';
import { Container, TableContainer, Paper, IconButton } from '@material-ui/core';
import { useStyles } from "@pages/FillingPage/common/styles/styles"
import { TableTitleComponent } from './TableComponent/TableTitleComponent';
import { TableComponent } from './TableComponent/TableComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';
import { DataTable } from '@common/models/DataTable';
import { Types } from '@common/models/Types';
import { Column } from '@common/models/Column';

interface FillingTableProps {
    table: DataTable;
    cells: Cell[];
    rows: Row[];
    columns: Column[];
    crudRow: any;
    onValueChange: any;
    addDeleteTable: any;
    formatCell: any;
    addEditRowMode: boolean;
}

export const FillingTableComponent = ({table, cells, rows, columns,
    onValueChange, crudRow, addDeleteTable, formatCell, addEditRowMode}: FillingTableProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingTable}>
            <IconButton style={{marginTop: '-10px'}}
                 onClick={() => addDeleteTable(Types[Types.DELETETABLE])}
            >
                <DeleteIcon />
            </IconButton>
            <TableContainer component={Paper}  className={classes.fillingTableTable}>
               <TableTitleComponent 
                    table={table}
                    crudRow={crudRow} 
                />
                <TableComponent 
                    table={table}
                    crudRow={crudRow}
                    onValueChange={onValueChange}
                    cells={cells}
                    rows={rows}
                    columns={columns}
                    formatCell={formatCell}
                    addEditRowMode={addEditRowMode}
             />
            </TableContainer>
        </Container>
      );
}