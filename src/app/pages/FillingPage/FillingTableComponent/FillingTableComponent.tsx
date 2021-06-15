import React from 'react';
import { observer } from 'mobx-react-lite';
import { IconButton, Container, TableContainer, Typography, TableCell, TableRow, TableHead, Table, TableBody, Paper } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import { TableModel } from '../../../common/models/TableModel';
import { AddRowComponent } from './AddRowComponent';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


interface CProps {
    table: TableModel;
    addRow: any;
}

export const FillingTableComponent = observer(({table, addRow}: CProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingTable}>
            <TableContainer component={Paper}>
                <Container className={classes.fillingTableTitle}>
                    <Typography variant="h6" id="tableTitle">
                        {table.title}
                    </Typography>
                    <IconButton
                        onClick={() => addRow(table.id)}
                    >
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Container>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.fillingTableCoHead}>
                        <TableRow> 
                            {table.columns.map((col) => (
                                <TableCell key={col.id}>{col.label}</TableCell>
                            ))}
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>
            <AddRowComponent table={table}/>
        </Container>
      );
});