import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { useStyles } from "../../../common/styles/styles"
import { List, ListItem } from '@material-ui/core';
import { TableModel } from '../../../common/models/TableModel';
import { TableBodyComponent } from './TableBodyComponent';

interface CProps {
    tables: TableModel[];
    chooseTable: any;
}

export const ChooseTableComponent = observer(({tables, chooseTable} : CProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.chooseTable}>
            <Container><h2>Choose Table to Fill</h2></Container>
            <List className={classes.chooseTableList}>
                {tables.map(table => {
                    return (
                        <ListItem key={table.id} className={classes.chooseTableListItem}>
                            <TableBodyComponent 
                                table={table}
                                chooseTable={chooseTable}
                                />
                        </ListItem>
                    );
                 })}
            </List>
        </Container>
      );
});