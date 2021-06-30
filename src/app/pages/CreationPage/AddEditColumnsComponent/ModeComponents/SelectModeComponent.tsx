import React from 'react';
import Container from '@material-ui/core/Container';
import {TextField, FormControlLabel, IconButton, List, Select, FormControl, InputLabel, Checkbox } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { SelectModeItemComponent } from './SelectModeItemComponent';

interface SelectModeProps {
    table: AdditionalTable;
    addSelectField: any;
    deleteSelectField: any;
    selectValue: string;
    selectOptions: string[];
    selectTypeValue: string;
    isRequired: boolean;
    maxItemsSelected: number;
    OnValueChange: any;
}

export const SelectModeComponent = ({table, addSelectField, 
    deleteSelectField, selectValue, selectOptions, selectTypeValue, 
    isRequired, OnValueChange, maxItemsSelected} : SelectModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
            <Container className={classes.addSelectLeft}>
                <h3>Add Select Options</h3>
                <Container className={classes.addSelectLeftUp}>
                    <TextField 
                        label="Enter Select Option Name"
                        value={ selectValue }
                        onChange={e => OnValueChange(e, table.id, "SELECTVALUECHANGE")}
                    />
                    <IconButton onClick={() => addSelectField(table.id)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Container>
                <Container>
                <List>
                    {selectOptions.map((value, index) => (
                            <SelectModeItemComponent 
                                key={index}
                                table={table}
                                value={value}
                                idx={index}
                                deleteSelectField={deleteSelectField}
                            />
                    ))}
                </List>
                </Container>
            </Container>
            <Container>
                <h3>Choose Select Mode</h3>
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Select Mode</InputLabel> 
                    <Select
                        native
                        style={{minWidth:'150px'}}
                        value={ selectTypeValue }
                        onChange={e => OnValueChange(e, table.id, "SELECTMODECHANGE")}
                    >
                            <option value="0">Single</option>
                            <option value="1">Multy</option>
                    </Select> 
                </FormControl>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isRequired}
                            onChange={e => OnValueChange(e, table.id, "ISREQUIREDCHANGE")}
                    /> 
                    }
                    label="Is Required"
                /> 
            </Container>
        </Container>
    );
}