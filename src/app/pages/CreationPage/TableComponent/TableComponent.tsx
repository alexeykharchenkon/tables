import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import { TableModel } from "../../../common/models/TableModel";
import { DataType } from '../../../common/models/DataType';
import { AddEditColumnsComponent } from '../AddEditColumnsComponent/AddEditColumnsComponent';
import { TableBodyComponent } from './TableBodyComponent';


interface CProps {
    table: TableModel;
    addColumn: any;
    columnTypeValue: DataType;
    columnTypeValueChange: any;
    columnValue: string;
    columnValueChange: any;
    deleteColumn: any;
    editColumn: any;
    editMode: boolean;
    saveEditedColumn: any;
    deleteTable: any
}

export const TableComponent = observer(({
    table, addColumn, columnTypeValue, columnTypeValueChange, 
    columnValue, columnValueChange, deleteColumn, editColumn,
     editMode, saveEditedColumn, deleteTable} : CProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.tableCo}>
            <Container>
             <Button
                variant="contained"
                color="secondary"
                onClick={() => deleteTable(table.id)}
            > Delete Table</Button> 
            </Container>
            <AddEditColumnsComponent 
                table = {table} 
                addColumn = {addColumn}
                columnTypeValue = {columnTypeValue}
                columnTypeValueChange = {columnTypeValueChange}
                columnValue = {columnValue}
                columnValueChange = {columnValueChange}
                editMode = {editMode}
                saveEditedColumn ={saveEditedColumn}
            />
            <TableBodyComponent
                 table ={table}
                 deleteColumn={deleteColumn}
                 editColumn={editColumn}
            />
    </Container>
    );
});