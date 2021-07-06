import React from 'react';
import { AddEditColumns } from './AddEditColums';
import { SelectModeComponent } from './ModeComponents/SelectModeComponent';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { TextModeComponent } from './ModeComponents/TextModeComponent';
import { DateModeComponent } from './ModeComponents/DateModeComponent';
import { NumberModeComponent } from './ModeComponents/NumberModeComponent';
import { Column } from '@common/models/Column';


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
    dateFormat: string;
    selectValue: string;
    selectOptions: string[];
    selectTypeValue: string;
    forbiddenSymbols: string;
    isRequired: boolean;
    maxLength: string;
    maxItemsSelected: string;
    minValue: string;
    maxValue: string;
    activeColumn: Column;
}

export const AddEditColumnsComponent = ({table, addColumn, 
    saveEditedColumn, addSelectField, deleteSelectField, 
    selectMode, editMode, textMode, dateMode,
    dateFormat, selectValue, selectOptions, 
    selectTypeValue, forbiddenSymbols, isRequired, 
    OnValueChange, numberMode, maxLength, maxItemsSelected, minValue, 
    maxValue, activeColumn} : AddEditColumnsProps) => {      
        return (
        <>
            <AddEditColumns
                table = {table} 
                addOrEditColumn = {editMode ? saveEditedColumn : addColumn}
                OnValueChange ={OnValueChange}
                addMode = { editMode }
                activeColumn={activeColumn}
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