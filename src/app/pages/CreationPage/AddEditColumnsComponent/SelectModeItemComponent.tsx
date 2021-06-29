import React from 'react';
import { TextField, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { ListItem } from '@material-ui/core';

interface SelectModeItemProps {
    table: AdditionalTable;
    value: string;
    idx: number;
    deleteSelectField: any;
}

export const SelectModeItemComponent = ({table, value, idx,
    deleteSelectField } : SelectModeItemProps) => {

    return (
        <ListItem>
                <TextField 
                    value={value}
                />
                               
            <IconButton onClick={() => deleteSelectField(table.id, idx)}>
                <DeleteIcon />
            </IconButton>
        </ListItem>

    );
}