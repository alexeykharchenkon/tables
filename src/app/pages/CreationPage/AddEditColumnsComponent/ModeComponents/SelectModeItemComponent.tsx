import React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ListItem } from '@material-ui/core';
import { Types } from '@common/models/Types';

interface SelectModeItemProps {
    value: string;
    idx: number;
    addDeleteSelectField: any;
}

export const SelectModeItemComponent = ({ value, idx, addDeleteSelectField } : SelectModeItemProps) => {
    return (
        <ListItem>
            <TextField 
                value={value}
            />         
            <IconButton onClick={() => addDeleteSelectField(Types[Types.DELETESELECTFIELD], idx)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>

    );
}