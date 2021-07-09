import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { useStore } from '@common/stores/rootStore';
import { TableComponent } from './TableComponent/TableComponent'
import { CreateTableComponent } from './CreateTableComponent/CreateTableComponent';
import { ChooseTableComponent } from './ChooseTableComponent/ChooseTableComponent';

export const CreationPageComponent = observer(() => {
    const classes = useStyles();
    const { creatingStore, tableStore } = useStore();

    return (
        <Container className={classes.creationCo}>
            <h2>Tables Creation</h2>
            <h3>Create New Table Schema</h3>
            <CreateTableComponent
                tableTitleValue ={creatingStore.tableTitleValue}
                OnValueChange={creatingStore.OnValueChange}
                addDeleteTable={creatingStore.addDeleteTable}
            />
             <ChooseTableComponent 
                tableSchemas={tableStore.tableSchemas}
                columns={tableStore.columns}
                chooseTable={creatingStore.chooseTable}
            />
                {tableStore.tableSchemas?.map(table => {
                    return (
                        table.id === creatingStore.activeTableId &&
                            <TableComponent 
                                key={table.id}
                                columns={tableStore.columns}  
                                table = {table} 
                                crudColumn = {creatingStore.crudColumn}
                                addDeleteTable = {creatingStore.addDeleteTable}
                                addDeleteSelectField = {creatingStore.addDeleteSelectField}
                                OnValueChange ={creatingStore.OnValueChange} 
                                activeColumn={creatingStore.activeColumn} 
                                modes={creatingStore.modes} 
                                selectValue = {creatingStore.selectValue}
                             />
                    );
                 })}
        </Container>
      );
});