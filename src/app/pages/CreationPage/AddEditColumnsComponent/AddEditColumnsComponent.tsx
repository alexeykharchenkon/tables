import React from 'react';
import { observer } from 'mobx-react-lite';
import { AddEditColumns } from './AddEditColums';
import { AddSelect } from './AddSelect';
import { AdditionalTable } from '@common/models/AdditionalTable';


interface AddEditColumnsProps {
    table: AdditionalTable;
    addColumn: any;
    columnTypeValueChange: any;
    columnValueChange: any;
    saveEditedColumn: any;
    addSelectField: any;
    selectValueChange: any;
    deleteSelectField: any;
}

export const AddEditColumnsComponent = observer(({table, addColumn, 
    columnTypeValueChange, columnValueChange, saveEditedColumn,
    addSelectField, selectValueChange, deleteSelectField} : AddEditColumnsProps) => {
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
             {table.selectMode &&
             <AddSelect 
                table = {table} 
                addSelectField = {addSelectField}
                selectValueChange ={selectValueChange}
                deleteSelectField={deleteSelectField}
             />
             }
        </>    
    );
});