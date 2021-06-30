import React from 'react';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, Select, TextField, IconButton } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { DataType } from '@common/models/DataType';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AdditionalTable } from '@common/models/AdditionalTable';

interface AddEditColumnsProps {
    table: AdditionalTable;
    addOrEditColumn: any;
    OnValueChange: any;
    addMode: boolean;
    columnValue: string;
    columnTypeValue: string;
}

export const AddEditColumns  = ({table, addOrEditColumn, OnValueChange, 
    addMode, columnValue, columnTypeValue} : AddEditColumnsProps) => {
    const classes = useStyles();
    return (
            <Container className={classes.tableCoUp}>
                <TextField 
                    label="Enter Column Name"
                    value={ columnValue }
                    onChange={e => OnValueChange(e, table.id, "COLUMNVALUECHANGE")}
                />
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Column Type</InputLabel>
                    <Select
                        native
                        value={ columnTypeValue }
                        onChange={e => OnValueChange(e, table.id, "COLUMNTYPEVALUECHANGE")}
                    >
                        <option></option>
                        <option value={DataType[DataType.Text]}>Text</option>
                        <option value={DataType[DataType.Number]}>Number</option>
                        <option value={DataType[DataType.DatePicker]}>DatePicker</option>
                        <option value={DataType[DataType.Select]}>Select</option>
                        <option value={DataType[DataType.Checkbox]}>Checkbox</option>
                    </Select>
                </FormControl>
                <IconButton onClick={() => addOrEditColumn(table.id)}>
                    {!addMode && <SaveIcon />}
                    {addMode && <AddCircleOutlineIcon />}
                </IconButton>
            </Container>
    );
}