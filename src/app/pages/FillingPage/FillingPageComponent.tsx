import React from 'react';
import { observer } from 'mobx-react-lite';
import Container from '@material-ui/core/Container';
import { useStyles } from "../../common/styles/styles"
import { useStore } from '../../stores/rootStore';
import { ChooseTableComponent } from './ChooseTableComponent/ChooseTableComponent';
import { FillingTableComponent } from './FillingTableComponent/FillingTableComponent';

export const FillingPageComponent = observer(() => {
    const classes = useStyles();
    const { tableStore, fillingStore } = useStore();

    return (
        <Container className={classes.fillingCo}>
            <ChooseTableComponent 
                tables={tableStore.tables}
                chooseTable={fillingStore.chooseTable}
                />
            {fillingStore.fillingMode && (
                <FillingTableComponent
                    table = {fillingStore.fillingTable}
                    addRow = {fillingStore.addRow}
                />) }
        </Container>
      );
});