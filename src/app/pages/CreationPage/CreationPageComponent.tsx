import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { List, ListItem} from '@material-ui/core';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { useStore } from '@common/stores/rootStore';
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
                OnValueChange={creatingStore.OnValueChange}
                createTable={creatingStore.createTable}
            />
            <List>
                {tableStore.tables.map(table => {
                    return (
                        <ListItem key={table.id}>
                            <TableComponent 
                                table = {table} 
                                addColumn = {creatingStore.addColumn}
                                deleteColumn = {creatingStore.deleteColumn}
                                editColumn = {creatingStore.editColumn}
                                saveEditedColumn = {creatingStore.saveEditedColumn}
                                deleteTable = {creatingStore.deleteTable}
                                addSelectField = {creatingStore.addSelectField}
                                deleteSelectField={creatingStore.deleteSelectField}
                                OnValueChange ={creatingStore.OnValueChange} 
                                activeColumn={creatingStore.activeColumn}
                                columns={creatingStore.columns}   
                                modes={creatingStore.modes} 
                                selectValue = {creatingStore.selectValue}
                             />
                         </ListItem>
                    );
                 })}
            </List>
        </Container>
      );
});