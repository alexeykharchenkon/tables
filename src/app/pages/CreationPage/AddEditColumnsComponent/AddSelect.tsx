import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { ListItemText, TextField, IconButton, List } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { ListItem } from '@material-ui/core';

interface AddEditColumnsProps {
    table: AdditionalTable;
    addSelectField: any;
    selectValueChange: any;
    deleteSelectField: any;
}

export const AddSelect  = observer(({table, addSelectField, selectValueChange, deleteSelectField} : AddEditColumnsProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.addSelect}>
            <Container className={classes.tableCoUp}>
                <TextField 
                    label="Enter Select Option Name"
                    value={ table.selectValue }
                    onChange={e => selectValueChange(e.target.value, table.id)}
                />

                <IconButton 
                    onClick={() => addSelectField(table.id)}
                >
                    <AddCircleOutlineIcon />
                </IconButton>
            </Container>
            <Container>
               <List>
                   <h4>Select Options</h4>
                   {table.selectOptions.map( (s, index) => (
                        <ListItem key={index}>
                            <ListItemText 
                                primary={s}
                            />
                              <IconButton 
                                onClick={() => {deleteSelectField(table.id, index)}}
                                >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                   ))}
               </List>
            </Container>
        </Container>
    );
});