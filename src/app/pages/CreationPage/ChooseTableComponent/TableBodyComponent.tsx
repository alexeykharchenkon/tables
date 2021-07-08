import React from 'react';
import { useStyles } from "@pages/CreationPage/common/styles/styles"
import { TableContainer, Typography, TableCell, TableRow, TableHead, Table, TableBody, Paper } from '@material-ui/core';
import { TableSchema } from '@common/models/TableSchema';
import { Column } from '@common/models/Column';
import { observer } from 'mobx-react-lite';


interface TableBodyProps {
    tableSchema: TableSchema;
    columns: Column[];
    chooseTable: any;
}

export const TableBodyComponent = observer(({tableSchema, columns, chooseTable} : TableBodyProps) => {
    const classes = useStyles();
    return (
        <TableContainer 
            className={classes.chooseTableCo}
            component={Paper}
            onClick = {() => chooseTable(tableSchema.id)}
        >
                <Typography variant="h6">
                    {tableSchema.title}
                </Typography>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.chooseTableCoHead}>
                        <TableRow> 
                            <TableCell>Column Name</TableCell>
                            <TableCell>Column Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {columns?.map((col) => (
                            col.schemaId === tableSchema.id &&   
                            <TableRow key={col.id}>
                                <TableCell>{col.label}</TableCell>
                                <TableCell>{col.type}</TableCell>
                            </TableRow> 
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
      );
});