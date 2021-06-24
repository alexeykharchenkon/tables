import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { List, ListItem} from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { useStore } from '@stores/rootStore';
import { TableComponent } from './TableComponent/TableComponent'
import { CreateTableComponent } from './CreateTableComponent/CreateTableComponent';

export const CreationPageComponent = observer(() => {
    const classes = useStyles();
    const { creatingStore, tableStore } = useStore();

    return (
        <Container className={classes.creationCo}>
             <h2>Tables</h2>
            <CreateTableComponent
                tableTitleValue ={creatingStore.tableTitleValue}
                tableTitleValueOnChange={creatingStore.tableTitleValueOnChange}
                createTable={creatingStore.createTable}
            />
            <List>
                {tableStore.tables.map(table => {
                    return (
                        <ListItem key={table.id}>
                            <TableComponent 
                                table = {table} 
                                addColumn = {creatingStore.addColumn}
                                columnTypeValueChange = {creatingStore.columnTypeValueChange}
                                columnValueChange = {creatingStore.columnValueChange}
                                deleteColumn = {creatingStore.deleteColumn}
                                editColumn = {creatingStore.editColumn}
                                saveEditedColumn = {creatingStore.saveEditedColumn}
                                deleteTable = {creatingStore.deleteTable}
                                addSelectField = {creatingStore.addSelectField}
                                selectValueChange ={creatingStore.selectValueChange}
                                deleteSelectField={creatingStore.deleteSelectField}
                                selectModeValueChange={creatingStore.selectModeValueChange}
                                forbiddenValueChange={creatingStore.forbiddenValueChange}
                            />
                         </ListItem>
                    );
                 })}
            </List>
        </Container>
      );
});