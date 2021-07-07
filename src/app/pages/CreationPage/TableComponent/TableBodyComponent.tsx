import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles"
import { TableRowComponent } from './TableRowComponent';
import { Column } from '@common/models/Column';
import { TableSchema } from '@common/models/TableSchema';
import { observer } from 'mobx-react-lite';


interface TableBodyProps {
    table: TableSchema;
    deleteColumn: any;
    editColumn: any;
    columns: Column[];
}

export const TableBodyComponent = observer(({table, deleteColumn, editColumn, columns} : TableBodyProps) => {
    const classes = useStyles();
    
    return (
            <TableContainer component={Paper}>
                <Typography variant="h6" id="tableTitle">
                    {table.title}
                </Typography>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.tableCoHead}>
                        <TableRow  className={classes.tableCoRow}> 
                            <TableCell>Column Name</TableCell>
                            <TableCell>Column Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {columns.map(col => (
                            col.schemaId === table.id && 
                            <TableRowComponent
                                key={col.id}
                                deleteColumn = {deleteColumn}
                                editColumn = {editColumn}
                                col = {col}
                            />
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
    );
});