import React from 'react';
import { Container, IconButton } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles"
import { AddEditColumnsComponent } from '../AddEditColumnsComponent/AddEditColumnsComponent';
import { TableBodyComponent } from './TableBodyComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import { Column } from '@common/models/Column';
import { Modes } from '@common/models/Modes';
import { TableSchema } from '@common/models/TableSchema';


interface TableProps {
    table: TableSchema;
    addColumn: any;
    deleteColumn: any;
    editColumn: any;
    saveEditedColumn: any;
    deleteTable: any;
    addSelectField: any;
    deleteSelectField: any;
    modes: Modes;
    columns: Column[];
    selectValue: string;
    OnValueChange: any;
    activeColumn: Column;
}

export const TableComponent = React.memo(({table, addColumn, deleteColumn,
    editColumn, saveEditedColumn, deleteTable, addSelectField, 
    deleteSelectField, modes, columns, selectValue, OnValueChange, activeColumn} : TableProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.tableCo}>
            <Container>
            <IconButton 
                    onClick={() => deleteTable()}
            >
                    <DeleteIcon />
                </IconButton>
            </Container>
            <AddEditColumnsComponent 
                addColumn = {addColumn}
                saveEditedColumn ={saveEditedColumn}
                addSelectField = {addSelectField}
                deleteSelectField={deleteSelectField}
                OnValueChange={OnValueChange}
                modes={modes}
                selectValue = {selectValue}
                activeColumn={activeColumn}
            />
            <TableBodyComponent
                 table ={table}
                 deleteColumn={deleteColumn}
                 editColumn={editColumn}
                 columns={columns}
            />
    </Container>
    );
});