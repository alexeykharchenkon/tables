import React from 'react';
import { observer } from 'mobx-react-lite';
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
}

export const AddEditColumnsComponent = observer(({table, addColumn, 
    columnTypeValueChange, columnValueChange, saveEditedColumn,
    addSelectField, selectValueChange, deleteSelectField, 
    selectModeValueChange, forbiddenValueChange, dateFormatValueChange} : AddEditColumnsProps) => {      
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
             <SelectModeComponent
                table={table} 
                addSelectField={addSelectField}
                selectValueChange={selectValueChange}
                deleteSelectField={deleteSelectField}
                selectModeValueChange={selectModeValueChange}
             />
             }
             {table.textMode &&
             <TextModeComponent
                table = {table} 
                forbiddenValueChange={forbiddenValueChange}
             />
             }
             {table.dateMode &&
             <DateModeComponent
                table = {table}
                dateFormatValueChange={dateFormatValueChange}
             />
             }
        </>    
    );
});