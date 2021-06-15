import React from 'react';
import { observer } from 'mobx-react-lite';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import { TableModel } from "../../../common/models/TableModel";
import { TableRowComponent } from './TableRowComponent';


interface CProps {
    table: TableModel;
    deleteColumn: any;
    editColumn: any;
}

export const TableBodyComponent = observer(({
    table, deleteColumn, editColumn} : CProps) => {
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
                        {table.columns.map((col) => (
                            <TableRowComponent
                                key={col.id}
                                table = {table}
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