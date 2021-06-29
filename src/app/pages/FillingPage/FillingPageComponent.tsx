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
                                titleValueOnChange={fillingStore.titleValueOnChange}
                            />
                            {table.tablesData.map(tabData => (           
                                <ListItem key={tabData.id}>
                                    <FillingTableComponent
                                        table = {table}
                                        tabData = {tabData}
                                        addRow = {fillingStore.addRow}
                                        saveRow = {fillingStore.saveRow}
                                        cellValueChange={fillingStore.cellValueChange}
                                        editRow={fillingStore.editRow}
                                        deleteRow={fillingStore.deleteRow}
                                        activeTableId={fillingStore.activeTableId}
                                        deleteTable={fillingStore.deleteTable}
                                        selectValueChange={fillingStore.selectValueChange}
                                        checkboxValueChange={fillingStore.checkboxValueChange}
                                        cells={table.activeRow.cells}
                                        rows={tabData.rows}
                                        handleDateChange={fillingStore.handleDateChange}
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