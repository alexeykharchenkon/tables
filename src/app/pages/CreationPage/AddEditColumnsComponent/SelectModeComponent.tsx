import React from 'react';
import Container from '@material-ui/core/Container';
import {TextField, IconButton, List, Select, FormControl, InputLabel } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { SelectModeItemComponent } from './SelectModeItemComponent';

interface SelectModeProps {
    table: AdditionalTable;
    addSelectField: any;
    selectValueChange: any;
    deleteSelectField: any;
    selectModeValueChange: any;
    selectValue: string;
    selectOptions: string[];
    selectTypeValue: string;
}

export const SelectModeComponent = ({table, addSelectField, 
    selectValueChange, deleteSelectField, selectModeValueChange,
    selectValue, selectOptions, selectTypeValue} : SelectModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
            <Container className={classes.addSelectLeft}>
                <h3>Add Select Options</h3>
                <Container className={classes.addSelectLeftUp}>
                    <TextField 
                        label="Enter Select Option Name"
                        value={ selectValue }
                        onChange={e => selectValueChange(e.target.value, table.id)}
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
                        onChange={e => selectModeValueChange(e.target.value, table.id)}
                    >
                            <option value="0">Single</option>
                            <option value="1">Multy</option>
                    </Select> 
                </FormControl>
            </Container>
        </Container>
    );
}