import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { FormControl, InputLabel, Select, TextField, IconButton } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import { TableModel } from "../../../common/models/TableModel";
import { DataType } from '../../../common/models/DataType';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';


interface CProps {
    table: TableModel;
    addOrEditColumn: any;
    columnTypeValue: DataType;
    columnTypeValueChange: any;
    columnValue: string;
    columnValueChange: any;
    addMode: boolean;
}

export const AddEditColumns  = observer(({
    table, addOrEditColumn, columnTypeValue, columnTypeValueChange, 
    columnValue, columnValueChange, addMode} : CProps) => {
    const classes = useStyles();

    return (
            <Container className={classes.tableCoUp}>
                <TextField 
                    label="Enter Column Name"
                    value={ columnValue }
                    onChange={e => columnValueChange(e.target.value)}
                />
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Column Type</InputLabel>
                    <Select
                        native
                        value={ columnTypeValue }
                        onChange={e => columnTypeValueChange(e.target.value)}
                    >
                        <option value={DataType.Text}>Text</option>
                        <option value={DataType.Number}>Number</option>
                        <option value={DataType.DatePicker}>DatePicker</option>
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