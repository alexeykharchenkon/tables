import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { ListItemText, TextField, IconButton, List, Select, FormControl, InputLabel } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { ListItem } from '@material-ui/core';

interface SelectModeProps {
    table: AdditionalTable;
    addSelectField: any;
    selectValueChange: any;
    deleteSelectField: any;
    selectModeValueChange: any;
}

export const SelectModeComponent = observer(({table, addSelectField, 
    selectValueChange, deleteSelectField, selectModeValueChange} : SelectModeProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
            <Container className={classes.addSelectLeft}>
                <h3>Add Select Options</h3>
                <Container className={classes.addSelectLeftUp}>
                    <TextField 
                        label="Enter Select Option Name"
                        value={ table.selectValue }
                        onChange={e => selectValueChange(e.target.value, table.id)}
                    />
                    <IconButton onClick={() => addSelectField(table.id)}>
                        <AddCircleOutlineIcon />
                    </IconButton>
                </Container>
                <Container>
                <List>
                    {table.selectOptions.map( (s, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={s}/>
                                <IconButton onClick={() => {deleteSelectField(table.id, index)}}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
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
                        value={ table.selectTypeValue }
                        onChange={e => selectModeValueChange(e.target.value, table.id)}
                    >
                            <option value="0">Single</option>
                            <option value="1">Multy</option>
                    </Select> 
                </FormControl>
            </Container>
        </Container>
    );
});