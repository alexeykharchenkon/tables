import React from 'react';
import { observer } from 'mobx-react-lite';
import { TableModel } from "../../../common/models/TableModel";
import { DataType } from '../../../common/models/DataType';
import { AddEditColumns } from './AddEditColums';


interface CProps {
    table: TableModel;
    addColumn: any;
    columnTypeValue: DataType;
    columnTypeValueChange: any;
    columnValue: string;
    columnValueChange: any;
    editMode: boolean;
    saveEditedColumn: any;
}

export const AddEditColumnsComponent = observer(({
    table, addColumn, columnTypeValue, columnTypeValueChange, 
    columnValue, columnValueChange, editMode, saveEditedColumn} : CProps) => {

    return (
        <>
            {!editMode &&
            <AddEditColumns 
                table = {table} 
                addOrEditColumn = {addColumn}
                columnTypeValue = {columnTypeValue}
                columnTypeValueChange = {columnTypeValueChange}
                columnValue = {columnValue}
                columnValueChange = {columnValueChange}
                addMode = {true}
            />
            }
            {editMode &&
            <AddEditColumns
                table = {table} 
                addOrEditColumn = {saveEditedColumn}
                columnTypeValue = {columnTypeValue}
                columnTypeValueChange = {columnTypeValueChange}
                columnValue = {columnValue}
                columnValueChange = {columnValueChange}
                addMode = {false}
            />
            }
        </>    
    );
});