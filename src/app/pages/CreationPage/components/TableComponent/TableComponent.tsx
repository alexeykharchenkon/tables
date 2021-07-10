import React from 'react';
import { Container, IconButton } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles"
import { AddEditColumnsComponent } from '../AddEditColumnsComponent/AddEditColumnsComponent';
import { TableBodyComponent } from './TableBodyComponent';
import DeleteIcon from '@material-ui/icons/Delete';
import { Column } from '@common/models/Column';
import { Modes } from '@common/models/Modes';
import { TableSchema } from '@common/models/TableSchema';
import { Types } from '@common/models/Types';


interface TableProps {
    table: TableSchema;
    crudColumn: any;
    addDeleteTable: any;
    addDeleteSelectField: any;
    modes: Modes;
    columns: Column[];
    selectValue: string;
    OnValueChange: any;
    activeColumn: Column;
}

export const TableComponent = React.memo(({table, crudColumn, addDeleteTable, 
    addDeleteSelectField, modes, columns, selectValue, OnValueChange, activeColumn} : TableProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.tableCo}>
            <Container>
            <IconButton 
                    onClick={() => addDeleteTable(Types[Types.DELETETABLE])}
            >
                    <DeleteIcon />
                </IconButton>
            </Container>
            <AddEditColumnsComponent 
                crudColumn = {crudColumn}
                addDeleteSelectField = {addDeleteSelectField}
                OnValueChange={OnValueChange}
                modes={modes}
                selectValue = {selectValue}
                activeColumn={activeColumn}
            />
            <TableBodyComponent
                 table ={table}
                 crudColumn={crudColumn}
                 columns={columns}
            />
    </Container>
    );
});