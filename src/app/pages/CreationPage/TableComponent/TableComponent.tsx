import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, IconButton } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import { TableModel } from "../../../common/models/TableModel";
import { DataType } from '../../../common/models/DataType';
import { AddEditColumnsComponent } from '../AddEditColumnsComponent/AddEditColumnsComponent';
import { TableBodyComponent } from './TableBodyComponent';
import DeleteIcon from '@material-ui/icons/Delete';


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
            <IconButton 
                    onClick={() => deleteTable(table.id)}
            >
                    <DeleteIcon />
                </IconButton>
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