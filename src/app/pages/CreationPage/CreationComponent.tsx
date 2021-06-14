import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { Button, List, ListItem, TextField } from '@material-ui/core';
import { useStyles } from "../../common/styles/styles"
import { useStore } from '../../stores/rootStore';
import { TableComponent } from './TableComponent'

export const CreationComponent = observer(() => {
    const classes = useStyles();
    const { tableStore } = useStore();

    return (
        <Container className={classes.creationCo}>
            <Container className={classes.creationCoUp}>
                <TextField 
                    label="Enter Table Title" 
                    value={tableStore.tableTitleValue}
                    onChange={e => tableStore.tableTitleValueOnChange(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => tableStore.createTable()}
                > Create New Table </Button> 
            </Container>
            <List>
                {tableStore.tables.map(table => {
                    return (
                        <ListItem key={table.id}>
                            <TableComponent 
                                table = {table} 
                                addColumn = {tableStore.addColumn}
                                colTypeSelectValue = {tableStore.colTypeSelectValue}
                                colTypeSelectValueChange = {tableStore.colTypeSelectValueChange}
                                addColumValue = {tableStore.addColumValue}
                                addColumValueChange = {tableStore.addColumValueChange}
                            />
                         </ListItem>
                    );
                 })}
            </List>
        </Container>
      );
});