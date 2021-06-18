import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@common/styles/styles"
import { List, ListItem } from '@material-ui/core';
import { TableModel } from '@common/models/TableModel';
import { TableBodyComponent } from './TableBodyComponent';

interface ChooseTableProps {
    tables: TableModel[];
    chooseTable: any;
}

export const ChooseTableComponent = React.memo(({tables, chooseTable} : ChooseTableProps) => {
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