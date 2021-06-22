import React from 'react';
import { observer } from 'mobx-react-lite';
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
    columnTypeValueChange: any;
    columnValueChange: any;
    addMode: boolean;
}

export const AddEditColumns  = observer(({table, addOrEditColumn, 
    columnTypeValueChange, columnValueChange, addMode} : AddEditColumnsProps) => {
    const classes = useStyles();

    return (
            <Container className={classes.tableCoUp}>
                   <TextField 
                        label="Enter Column Name"
                        value={ table.columnValue }
                        onChange={e => columnValueChange(e.target.value, table.id)}
                    />
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Column Type</InputLabel>
                    <Select
                        native
                        value={ table.columnTypeValue }
                        onChange={e => columnTypeValueChange(e.target.value, table.id)}
                    >
                        <option value={DataType.Text}>Text</option>
                        <option value={DataType.Number}>Number</option>
                        <option value={DataType.DatePicker}>DatePicker</option>
                        <option value={DataType.Select}>Select</option>
                    </Select>
                </FormControl>
                {!addMode &&  
                    <IconButton 
                        onClick={() => addOrEditColumn(table.id)}
                    >
                        <SaveIcon />
                    </IconButton>}
                {addMode &&  
                <IconButton 
                    onClick={() => addOrEditColumn(table.id)}
                >
                    <AddCircleOutlineIcon />
                </IconButton>}
            </Container>
    );
});