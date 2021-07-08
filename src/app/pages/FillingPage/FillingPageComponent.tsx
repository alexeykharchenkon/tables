import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { useStyles } from "@pages/FillingPage/common/styles/styles"
import { useStore } from '@common/stores/rootStore';
import { ChooseTableSchemaComponent } from './ChooseTableSchemaComponent/ChooseTableSchemaComponent';
import { FillingTableComponent } from './FillingTableComponent/FillingTableComponent';
import { ChooseTableComponent } from './ChooseTableComponent/ChooseTableComponent';
import { AddTableComponent } from './AddTableComponent/AddTableComponent';

export const FillingPageComponent = observer(() => {
    const classes = useStyles();
    const { tableStore, fillingStore } = useStore();
    return (
        <Container className={classes.fillingCo}>
            <h2>Tables Filling</h2>
            <ChooseTableSchemaComponent 
                tableSchemas={tableStore.tableSchemas}
                columns={tableStore.columns}
                chooseTable={fillingStore.chooseTableSchema}
            />
            {fillingStore.activeSchemaId !== "" &&
                <Container>
                    <AddTableComponent
                        addDeleteTable={fillingStore.addDeleteTable}
                        titleValue={fillingStore.titleValue}
                        onValueChange={fillingStore.onValueChange}
                    />
                    <ChooseTableComponent 
                        tables={tableStore.dataTables}
                        chooseTable={fillingStore.chooseTable}
                        activeSchemaId={fillingStore.activeSchemaId}
                    />
                </Container>}
                {tableStore.dataTables?.map(table => {
                    return (
                        table.id === fillingStore.activeTableId &&      
                        <FillingTableComponent
                            key={table.id}
                            table={table}
                            columns={tableStore.columns}
                            cells={tableStore.cells}
                            rows={tableStore.rows}
                            crudRow = {fillingStore.crudRow}
                            onValueChange={fillingStore.onValueChange}
                            addDeleteTable={fillingStore.addDeleteTable}
                            formatCell={fillingStore.formatCell}
                            addEditRowMode={fillingStore.addEditRowMode}
                        />      
                );
            })}
        </Container>
      );
});