import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { useStyles } from "@common/styles/styles";
import { useStore } from '@stores/rootStore';
import { ChooseTableComponent } from './ChooseTableComponent/ChooseTableComponent';
import { FillingTableComponent } from './FillingTableComponent/FillingTableComponent';
import { List, ListItem } from '@material-ui/core';
import { FillingTableHeadComponent } from './FillingTableComponent/FillingTableHeadComponent';

export const FillingPageComponent = observer(() => {
    const classes = useStyles();
    const { tableStore, fillingStore } = useStore();
    return (
        <Container className={classes.fillingCo}>
            <ChooseTableComponent 
                tables={tableStore.tables}
                chooseTable={fillingStore.chooseTable}
                />
            <List className={classes.fillingTablesList}>
                {tableStore.tables.map(table => (    
                    table.fillingMode && 
                    <ListItem key={table.id}>
                        <List>
                            <FillingTableHeadComponent
                                table={table}
                                addTable={fillingStore.addTable}
                                titleValue={fillingStore.titleValue}
                                onValueChange={fillingStore.onValueChange}
                            />
                            {table.tablesData.map(tabData => (           
                                <ListItem key={tabData.id}>
                                    <FillingTableComponent
                                        table = {table}
                                        tabData = {tabData}
                                        addRow = {fillingStore.addRow}
                                        saveRow = {fillingStore.saveRow}
                                        onValueChange={fillingStore.onValueChange}
                                        editRow={fillingStore.editRow}
                                        deleteRow={fillingStore.deleteRow}
                                        activeTableId={fillingStore.activeTableId}
                                        deleteTable={fillingStore.deleteTable}
                                        cells={table.activeRow.cells}
                                        rows={tabData.rows}
                                        formatDate= {fillingStore.formatDate}
                                        formatSelect={fillingStore.formatSelect}
                                        helperText={fillingStore.helperText}
                                        cancelAddRow={fillingStore.cancelAddRow}
                                    />
                                </ListItem>
                             ))}
                        </List>
                    </ListItem>
                    ))}
            </List>
        </Container>
      );
});