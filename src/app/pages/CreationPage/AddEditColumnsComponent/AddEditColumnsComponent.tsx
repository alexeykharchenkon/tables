import React from 'react';
import { observer } from 'mobx-react-lite';
import { AddEditColumns } from './AddEditColums';
import { AdditionalTable } from '@common/models/AdditionalTable';


interface AddEditColumnsProps {
    table: AdditionalTable;
    addColumn: any;
    columnTypeValueChange: any;
    columnValueChange: any;
    saveEditedColumn: any;
}

export const AddEditColumnsComponent = observer(({table, addColumn, 
    columnTypeValueChange, columnValueChange, saveEditedColumn} : AddEditColumnsProps) => {
    return (
        <>
            {!table.editMode &&
            <AddEditColumns 
                table = {table} 
                addOrEditColumn = {addColumn}
                columnTypeValueChange = {columnTypeValueChange}
                columnValueChange = {columnValueChange}
                addMode = {true}
            />
            }
            {table.editMode &&
            <AddEditColumns
                table = {table} 
                addOrEditColumn = {saveEditedColumn}
                columnTypeValueChange = {columnTypeValueChange}
                columnValueChange = {columnValueChange}
                addMode = {false}
            />
            }
        </>    
    );
});