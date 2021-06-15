import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { FormControl, Button, InputLabel, Select, TextField } from '@material-ui/core';
import { useStyles } from "../../../common/styles/styles"
import { TableModel } from "../../../common/models/TableModel";
import { DataType } from '../../../common/models/DataType';


interface CProps {
    table: TableModel;
    addOrEditColumn: any;
    columnTypeValue: DataType;
    columnTypeValueChange: any;
    columnValue: string;
    columnValueChange: any;
    buttonLabel: string;
}

export const AddEditColumns  = observer(({
    table, addOrEditColumn, columnTypeValue, columnTypeValueChange, 
    columnValue, columnValueChange, buttonLabel} : CProps) => {
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addOrEditColumn(table.id)}
                > {buttonLabel}</Button> 
            </Container>
    );
});