import React from 'react';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, Select, TextField, IconButton } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { DataType } from '@common/models/DataType';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Types } from '@common/models/Types';
import { Column } from '@common/models/Column';

interface AddEditColumnsProps {
    crudColumn: any;
    OnValueChange: any;
    addMode: boolean;
    activeColumn: Column;
}

export const AddEditColumns  = ({ crudColumn, OnValueChange, 
    addMode, activeColumn} : AddEditColumnsProps) => {
    const classes = useStyles();
    return (
            <Container className={classes.tableCoUp}>
                <TextField 
                    label="Enter Column Name"
                    name="label"
                    value={ activeColumn.label }
                    onChange={e => OnValueChange(e, Types[Types.COLUMNVALUECHANGE])}
                />
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Column Type</InputLabel>
                    <Select
                        name="type"
                        native
                        value={ activeColumn.type }
                        onChange={e => OnValueChange(e, Types[Types.COLUMNTYPEVALUECHANGE])}
                    >
                        <option></option>
                        <option value={DataType[DataType.Text]}>Text</option>
                        <option value={DataType[DataType.Number]}>Number</option>
                        <option value={DataType[DataType.DatePicker]}>DatePicker</option>
                        <option value={DataType[DataType.Select]}>Select</option>
                        <option value={DataType[DataType.Checkbox]}>Checkbox</option>
                    </Select>
                </FormControl>
                <IconButton onClick={() => crudColumn(addMode ? Types[Types.SAVECOLUMN] : Types[Types.ADDCOLUMN], "")}>
                    {addMode && <SaveIcon />}
                    {!addMode && <AddCircleOutlineIcon />}
                </IconButton>
            </Container>
    );
}