import React from 'react';
import { AddEditColumns } from './AddEditColums';
import { SelectModeComponent } from './ModeComponents/SelectModeComponent';
import { TextModeComponent } from './ModeComponents/TextModeComponent';
import { DateModeComponent } from './ModeComponents/DateModeComponent';
import { NumberModeComponent } from './ModeComponents/NumberModeComponent';
import { Column } from '@common/models/Column';
import { Modes } from '@common/models/Modes';


interface AddEditColumnsProps {
    crudColumn: any;
    addDeleteSelectField: any;
    OnValueChange: any;
    modes: Modes;
    selectValue: string;
    activeColumn: Column;
}

export const AddEditColumnsComponent = ({crudColumn, addDeleteSelectField, 
    modes, selectValue, OnValueChange, activeColumn} : AddEditColumnsProps) => {      
        return (
        <>
            <AddEditColumns
                crudColumn = {crudColumn}
                OnValueChange ={OnValueChange}
                addMode = { modes.editMode }
                activeColumn={activeColumn}
            />
            {modes.textMode &&
             <TextModeComponent
                activeColumn={activeColumn}
                OnValueChange ={OnValueChange}
             />}
             {modes.selectMode &&
             <SelectModeComponent
                addDeleteSelectField={addDeleteSelectField}
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