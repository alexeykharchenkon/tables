import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { List, ListItem} from '@material-ui/core';
import { useStyles } from "../../common/styles/styles"
import { useStore } from '../../stores/rootStore';
import { TableComponent } from './TableComponent/TableComponent'
import { CreateTableComponent } from './CreateTableComponent/CreateTableComponent';

export const CreationPageComponent = observer(() => {
    const classes = useStyles();
    const { tableStore, columnStore } = useStore();

    return (
        <Container className={classes.creationCo}>
             <h2>Tables</h2>
            <CreateTableComponent
                tableTitleValue ={tableStore.tableTitleValue}
                tableTitleValueOnChange={tableStore.tableTitleValueOnChange}
                createTable={tableStore.createTable}
            />
            <List>
                {tableStore.tables.map(table => {
                    return (
                        <ListItem key={table.id}>
                            <TableComponent 
                                table = {table} 
                                addColumn = {columnStore.addColumn}
                                columnTypeValue = {columnStore.columnTypeValue}
                                columnTypeValueChange = {columnStore.columnTypeValueChange}
                                columnValue = {columnStore.columnValue}
                                columnValueChange = {columnStore.columnValueChange}
                                deleteColumn = {columnStore.deleteColumn}
                                editColumn = {columnStore.editColumn}
                                editMode = {columnStore.editMode}
                                saveEditedColumn = {columnStore.saveEditedColumn}
                                deleteTable = {tableStore.deleteTable}
                            />
                         </ListItem>
                    );
                 })}
            </List>
        </Container>
      );
});