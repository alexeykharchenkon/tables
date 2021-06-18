import React from 'react';
import { useStyles } from "@common/styles/styles"
import { TableModel } from '@common/models/TableModel';
import { TableContainer, Typography, TableCell, TableRow, TableHead, Table, TableBody, Paper } from '@material-ui/core';
import { TableRowComponent } from './TableRowComponent';


interface TableBodyProps {
    table: TableModel;
    chooseTable: any;
}

export const TableBodyComponent = ({table, chooseTable} : TableBodyProps) => {
    const classes = useStyles();
    return (
        <TableContainer 
            className={classes.fillingTableCo}
            component={Paper}
            onClick = {() => chooseTable(table.id)}
        >
                <Typography variant="h6" id="tableTitle">
                    {table.title}
                </Typography>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.fillingTableCoHead}>
                        <TableRow> 
                            <TableCell>Column Name</TableCell>
                            <TableCell>Column Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.columns.map((col) => (
                            <TableRowComponent key={col.id} col = {col} />
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
      );
}