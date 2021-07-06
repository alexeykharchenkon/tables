import React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItem } from '@material-ui/core';

interface SelectModeItemProps {
    value: string;
    idx: number;
    deleteSelectField: any;
}

export const SelectModeItemComponent = ({ value, idx, deleteSelectField } : SelectModeItemProps) => {
    return (
        <ListItem>
            <TextField 
                value={value}
            />         
            <IconButton onClick={() => deleteSelectField(idx)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>

    );
}