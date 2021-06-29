import React from 'react';
import { AddEditColumns } from './AddEditColums';
import { SelectModeComponent } from './SelectModeComponent';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { TextModeComponent } from './TextModeComponent';
import { DateModeComponent } from './DateModeComponent';


interface AddEditColumnsProps {
    table: AdditionalTable;
    addColumn: any;
    columnTypeValueChange: any;
    columnValueChange: any;
    saveEditedColumn: any;
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
    dateFormat: string;
    selectValue: string;
    selectOptions: string[];
    selectTypeValue: string;
    forbiddenSymbols: string;
}

export const AddEditColumnsComponent = ({table, addColumn, 
    columnTypeValueChange, columnValueChange, saveEditedColumn,
    addSelectField, selectValueChange, deleteSelectField, 
    selectModeValueChange, forbiddenValueChange, dateFormatValueChange,
    selectMode, editMode, textMode, dateMode,
    columnValue, columnTypeValue, dateFormat,
    selectValue, selectOptions, selectTypeValue, forbiddenSymbols} : AddEditColumnsProps) => {      
        return (
        <>
            {!editMode &&
            <AddEditColumns 
                table = {table} 
                addOrEditColumn = {addColumn}
                columnTypeValueChange = {columnTypeValueChange}
                columnValueChange = {columnValueChange}
                addMode = {true}
                columnValue={columnValue}
                columnTypeValue={columnTypeValue}
            />
            }
            {editMode &&
            <AddEditColumns
                table = {table} 
                addOrEditColumn = {saveEditedColumn}
                columnTypeValueChange = {columnTypeValueChange}
                columnValueChange = {columnValueChange}
                addMode = {false}
                columnValue={columnValue}
                columnTypeValue={columnTypeValue}
            />
            }
             {selectMode &&
             <SelectModeComponent
                table={table} 
                addSelectField={addSelectField}
                selectValueChange={selectValueChange}
                deleteSelectField={deleteSelectField}
                selectModeValueChange={selectModeValueChange}
                selectValue = {selectValue}
                selectOptions = {selectOptions}
                selectTypeValue ={selectTypeValue}
             />
             }
             {textMode &&
             <TextModeComponent
                table = {table} 
                forbiddenValueChange={forbiddenValueChange}
                forbiddenSymbols={forbiddenSymbols}
             />
             }
             {dateMode &&
             <DateModeComponent
                table = {table}
                dateFormatValueChange={dateFormatValueChange}
                dateFormat={dateFormat}
             />
             }
        </>    
    );
}