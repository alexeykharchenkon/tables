import React from 'react';
import { AddEditColumns } from './AddEditColums';
import { SelectModeComponent } from './ModeComponents/SelectModeComponent';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { TextModeComponent } from './ModeComponents/TextModeComponent';
import { DateModeComponent } from './ModeComponents/DateModeComponent';
import { NumberModeComponent } from './ModeComponents/NumberModeComponent';


interface AddEditColumnsProps {
    table: AdditionalTable;
    addColumn: any;
    saveEditedColumn: any;
    addSelectField: any;
    deleteSelectField: any;
    OnValueChange: any;
    selectMode: boolean;
    editMode: boolean;
    textMode: boolean;
    dateMode: boolean;
    numberMode: boolean;
    columnValue: string;
    columnTypeValue: string;
    dateFormat: string;
    selectValue: string;
    selectOptions: string[];
    selectTypeValue: string;
    forbiddenSymbols: string;
    isRequired: boolean;
    maxLength: number;
    maxItemsSelected: number;
    minValue: number;
    maxValue: number;
}

export const AddEditColumnsComponent = ({table, addColumn, 
    saveEditedColumn, addSelectField, deleteSelectField, 
    selectMode, editMode, textMode, dateMode, columnValue, 
    columnTypeValue, dateFormat, selectValue, selectOptions, 
    selectTypeValue, forbiddenSymbols, isRequired, 
    OnValueChange, numberMode, maxLength, maxItemsSelected, minValue, 
    maxValue} : AddEditColumnsProps) => {      
        return (
        <>
            <AddEditColumns
                table = {table} 
                addOrEditColumn = {editMode ? saveEditedColumn : addColumn}
                OnValueChange ={OnValueChange}
                addMode = { editMode ? false : true}
                columnValue={columnValue}
                columnTypeValue={columnTypeValue}
            />
            {textMode &&
             <TextModeComponent
                table = {table} 
                forbiddenSymbols={forbiddenSymbols}
                isRequired ={isRequired}
                maxLength={maxLength}
                OnValueChange ={OnValueChange}
             />}
             {selectMode &&
             <SelectModeComponent
                table={table} 
                addSelectField={addSelectField}
                deleteSelectField={deleteSelectField}
                selectValue = {selectValue}
                selectOptions = {selectOptions}
                selectTypeValue ={selectTypeValue}
                isRequired={isRequired}
                maxItemsSelected={maxItemsSelected}
                OnValueChange ={OnValueChange}
             />}
             {dateMode &&
             <DateModeComponent
                table = {table}
                dateFormat={dateFormat}
                isRequired ={isRequired}
                OnValueChange ={OnValueChange}
             />}
            {numberMode &&
             <NumberModeComponent
                table = {table}
                isRequired ={isRequired}
                minValue={minValue}
                maxValue={maxValue}
                OnValueChange ={OnValueChange}
             />}
        </>    
    );
}