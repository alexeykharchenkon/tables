import React from 'react';
import { Container, IconButton } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { AddEditColumnsComponent } from '../AddEditColumnsComponent/AddEditColumnsComponent';
import { TableBodyComponent } from './TableBodyComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import { AdditionalTable } from '@common/models/AdditionalTable';


interface TableProps {
    table: AdditionalTable;
    addColumn: any;
    columnTypeValueChange: any;
    columnValueChange: any;
    deleteColumn: any;
    editColumn: any;
    saveEditedColumn: any;
    deleteTable: any;
    addSelectField: any;
    selectValueChange: any;
    deleteSelectField: any;
    selectModeValueChange: any;
    forbiddenValueChange: any;
}

export const TableComponent = React.memo(({table, addColumn, columnTypeValueChange, 
    columnValueChange, deleteColumn, editColumn, saveEditedColumn, 
    deleteTable, addSelectField, selectValueChange, deleteSelectField,
    selectModeValueChange, forbiddenValueChange} : TableProps) => {
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
                columnTypeValueChange = {columnTypeValueChange}
                columnValueChange = {columnValueChange}
                saveEditedColumn ={saveEditedColumn}
                addSelectField = {addSelectField}
                selectValueChange ={selectValueChange}
                deleteSelectField={deleteSelectField}
                selectModeValueChange={selectModeValueChange}
                forbiddenValueChange={forbiddenValueChange}
            />
            <TableBodyComponent
                 table ={table}
                 deleteColumn={deleteColumn}
                 editColumn={editColumn}
            />
    </Container>
    );
});