import React from 'react';
import { AddEditColumns } from './AddEditColums';
import { SelectModeComponent } from './ModeComponents/SelectModeComponent';
import { TextModeComponent } from './ModeComponents/TextModeComponent';
import { DateModeComponent } from './ModeComponents/DateModeComponent';
import { NumberModeComponent } from './ModeComponents/NumberModeComponent';
import { Column } from '@common/models/Column';
import { Modes } from '@common/models/Modes';


interface AddEditColumnsProps {
    addColumn: any;
    saveEditedColumn: any;
    addSelectField: any;
    deleteSelectField: any;
    OnValueChange: any;
    modes: Modes;
    selectValue: string;
    activeColumn: Column;
}

export const AddEditColumnsComponent = ({addColumn, 
    saveEditedColumn, addSelectField, deleteSelectField, 
    modes, selectValue, OnValueChange, activeColumn} : AddEditColumnsProps) => {      
        return (
        <>
            <AddEditColumns
                addOrEditColumn = {modes.editMode ? saveEditedColumn : addColumn}
                OnValueChange ={OnValueChange}
                addMode = { !modes.editMode }
                activeColumn={activeColumn}
            />
            {modes.textMode &&
             <TextModeComponent
                activeColumn={activeColumn}
                OnValueChange ={OnValueChange}
             />}
             {modes.selectMode &&
             <SelectModeComponent
                addSelectField={addSelectField}
                deleteSelectField={deleteSelectField}
                selectValue = {selectValue}
                OnValueChange ={OnValueChange}
                activeColumn={activeColumn}
             />}
             {modes.dateMode &&
             <DateModeComponent
                activeColumn={activeColumn}
                OnValueChange ={OnValueChange}
             />}
            {modes.numberMode &&
             <NumberModeComponent
                activeColumn={activeColumn}
                OnValueChange ={OnValueChange}
             />}
        </>    
    );
}