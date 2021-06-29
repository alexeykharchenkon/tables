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
    dateFormatValueChange: any;
    selectMode: boolean;
    editMode: boolean;
    textMode: boolean;
    dateMode: boolean;
    columnValue: string;
    columnTypeValue: string;
    columns: Column[];
    dateFormat: string;
    selectValue: string;
    selectOptions: string[];
    selectTypeValue: string;
    forbiddenSymbols: string;
}

export const TableComponent = React.memo(({table, addColumn, columnTypeValueChange, 
    columnValueChange, deleteColumn, editColumn, saveEditedColumn, 
    deleteTable, addSelectField, selectValueChange, deleteSelectField,
    selectModeValueChange, forbiddenValueChange, dateFormatValueChange, 
    selectMode, editMode, textMode, dateMode,
    columnValue, columnTypeValue, columns, dateFormat,
    selectValue, selectOptions, selectTypeValue, forbiddenSymbols} : TableProps) => {
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
                dateFormatValueChange={dateFormatValueChange}
                selectMode={selectMode}
                editMode={editMode}
                textMode={textMode}
                dateMode={dateMode}
                columnValue={columnValue}
                columnTypeValue={columnTypeValue}
                dateFormat={dateFormat}
                selectValue = {selectValue}
                selectOptions = {selectOptions}
                selectTypeValue ={selectTypeValue}
                forbiddenSymbols={forbiddenSymbols}
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