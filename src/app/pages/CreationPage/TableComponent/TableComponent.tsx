import React from 'react';
import { Container, IconButton } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { AddEditColumnsComponent } from '../AddEditColumnsComponent/AddEditColumnsComponent';
import { TableBodyComponent } from './TableBodyComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { Column } from '@common/models/Column';


interface TableProps {
    table: AdditionalTable;
    addColumn: any;
    deleteColumn: any;
    editColumn: any;
    saveEditedColumn: any;
    deleteTable: any;
    addSelectField: any;
    deleteSelectField: any;
    selectMode: boolean;
    editMode: boolean;
    textMode: boolean;
    dateMode: boolean;
    numberMode: boolean;
    columnValue: string;
    columnTypeValue: string;
    columns: Column[];
    dateFormat: string;
    selectValue: string;
    selectOptions: string[];
    selectTypeValue: string;
    forbiddenSymbols: string;
    isRequired: boolean;
    OnValueChange: any;
    maxLength: string;
    maxItemsSelected: string;
    minValue: string;
    maxValue: string;
}

export const TableComponent = React.memo(({table, addColumn, deleteColumn,
    editColumn, saveEditedColumn, deleteTable, addSelectField, 
    deleteSelectField, selectMode, editMode, textMode, dateMode,
    columnValue, columnTypeValue, columns, dateFormat,
    selectValue, selectOptions, selectTypeValue, forbiddenSymbols,
    isRequired,  OnValueChange, numberMode,
    maxLength, maxItemsSelected, minValue, maxValue} : TableProps) => {
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
                saveEditedColumn ={saveEditedColumn}
                addSelectField = {addSelectField}
                deleteSelectField={deleteSelectField}
                OnValueChange={OnValueChange}
                selectMode={selectMode}
                editMode={editMode}
                textMode={textMode}
                dateMode={dateMode}
                numberMode={numberMode}
                columnValue={columnValue}
                columnTypeValue={columnTypeValue}
                dateFormat={dateFormat}
                selectValue = {selectValue}
                selectOptions = {selectOptions}
                selectTypeValue ={selectTypeValue}
                forbiddenSymbols={forbiddenSymbols}
                isRequired ={isRequired}
                maxLength={table.maxLength}
                maxItemsSelected={table.maxItemsSelected}
                minValue={table.minValue}
                maxValue={table.maxValue}
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