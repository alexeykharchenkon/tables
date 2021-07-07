import React from 'react';
import Container from '@material-ui/core/Container';
import {TextField, FormControlLabel, IconButton, List, Select, FormControl, InputLabel, Checkbox } from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { SelectModeItemComponent } from './SelectModeItemComponent';
import { Types } from '@common/models/Types';
import { Column } from '@common/models/Column';
import { SelectType } from '@common/models/SelectType';

interface SelectModeProps {
    addSelectField: any;
    deleteSelectField: any;
    selectValue: string;
    OnValueChange: any;
    activeColumn: Column;
}

export const SelectModeComponent = ({addSelectField, 
    deleteSelectField, selectValue, activeColumn, OnValueChange} : SelectModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
            <Container className={classes.addSelectLeft}>
                <h4>Add Select Options</h4>
                <Container className={classes.addSelectLeftUp}>
                    <TextField 
                        label="Enter Select Option Name"
                        value={ selectValue }
                        onChange={e => OnValueChange(e, Types[Types.SELECTVALUECHANGE])}
                    />
                    <IconButton onClick={() => addSelectField()}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Container>
                <Container>
                <List>
                    {activeColumn.selectOptions.split('/').map((value, index) => (
                            <SelectModeItemComponent 
                                key={index}
                                value={value}
                                idx={index}
                                deleteSelectField={deleteSelectField}
                            />
                    ))}
                </List>
                </Container>
            </Container>
            <Container>
                <h4>Choose Select Mode</h4>
                <FormControl className={classes.tableCoSelect}>
                    <InputLabel>Select Mode</InputLabel> 
                    <Select
                        native
                        name="multySelectMode"
                        style={{minWidth:'150px'}}
                        value={ activeColumn.multySelectMode }
                        onChange={e => OnValueChange(e,Types[Types.SELECTMODECHANGE])}
                    >
                        <option value={SelectType[SelectType.Single]}>Single</option>
                        <option value={SelectType[SelectType.Multy]}>Multy</option>
                    </Select> 
                </FormControl>
                <h4>Max Item Selected</h4>
                <TextField 
                        name="maxItemsSelected"
                        type="number"
                        label="Enter Max Item Selected"
                        value={activeColumn.maxItemsSelected}
                        onChange={e => OnValueChange(e, Types[Types.MAXITEMSELECTEDCHANGE])}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isRequired"
                            checked={activeColumn.isRequired==="true"? true: false}
                            onChange={e => OnValueChange(e, Types[Types.ISREQUIREDCHANGE])}
                    /> 
                    }
                    label="Is Required"
                /> 
            </Container>
        </Container>
    );
}