import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { useStyles } from "../../common/styles/styles"
import { TableModel } from "../../common/models/TableModel";
import { DataType } from '../../common/models/DataType';
import { AddColumnsComponent } from './AddColumsComponent';


interface CProps {
    table: TableModel;
    addColumn: any;
    colTypeSelectValue: DataType;
    colTypeSelectValueChange: any;
    addColumValue: string;
    addColumValueChange: any;
}

export const TableComponent = observer(({
    table, addColumn, colTypeSelectValue, colTypeSelectValueChange, 
    addColumValue, addColumValueChange} : CProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.tableCo}>
            <AddColumnsComponent 
                table = {table} 
                addColumn = {addColumn}
                colTypeSelectValue = {colTypeSelectValue}
                colTypeSelectValueChange = {colTypeSelectValueChange}
                addColumValue = {addColumValue}
                addColumValueChange = {addColumValueChange}
            />
            <TableContainer component={Paper}>
                <Typography variant="h6" id="tableTitle">
                    {table.title}
                </Typography>
                <Table size="small" aria-label="a dense table">
                    <TableHead className={classes.tableCoHead}>
                        <TableRow>
                            <TableCell>Column Name</TableCell>
                            <TableCell>Column Type</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table.columns.map((col) => (
                            <TableRow key={col.id}>
                                <TableCell>{col.label}</TableCell>
                                <TableCell>{DataType[col.type]}</TableCell>
                                <TableCell><Checkbox/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </TableContainer>
    </Container>
    );
});