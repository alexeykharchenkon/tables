import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { FormControl, Button, InputLabel, Select, TextField } from '@material-ui/core';
import { useStyles } from "../../common/styles/styles"
import { TableModel } from "../../common/models/TableModel";
import { DataType } from '../../common/models/DataType';


interface CProps {
    table: TableModel;
    addColumn: any;
    colTypeSelectValue: DataType;
    colTypeSelectValueChange: any;
    addColumValue: string;
    addColumValueChange: any;
}

export const AddColumnsComponent  = observer(({
    table, addColumn, colTypeSelectValue, colTypeSelectValueChange, 
    addColumValue, addColumValueChange} : CProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.tableCo}>
            <Container className={classes.tableCoUp}>
                <TextField 
                    label="Enter Column Name"
                    value={ addColumValue}
                    onChange={e => addColumValueChange(e.target.value)}
                />
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Column Type</InputLabel>
                    <Select
                        native
                        value={ colTypeSelectValue}
                        onChange={e => colTypeSelectValueChange(e.target.value)}
                    >
                        <option value={DataType.Text}>Text</option>
                        <option value={DataType.Number}>Number</option>
                        <option value={DataType.DatePicker}>DatePicker</option>
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addColumn(table.id)}
                > Create New Column </Button> 
            </Container>
    </Container>
    );
});