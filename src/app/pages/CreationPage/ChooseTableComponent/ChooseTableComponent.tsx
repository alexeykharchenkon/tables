import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@pages/CreationPage/common/styles/styles";
import { List, ListItem} from '@material-ui/core';
import { TableSchema } from '@common/models/TableSchema';
import { TableBodyComponent } from './TableBodyComponent';
import { Column } from '@app/common/models/Column';

interface ChooseTableProps {
    tableSchemas: TableSchema[];
    columns: Column[];
    chooseTable: any;
}

export const ChooseTableComponent = ({tableSchemas, columns, chooseTable} : ChooseTableProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.chooseTable}>
            <Container><h3>Choose Table Schema</h3></Container>
            <List className={classes.chooseTableList}>
                {tableSchemas.map(tableSchema => {
                    return (
                        <ListItem key={tableSchema.id} className={classes.chooseTableListItem}>
                           <TableBodyComponent 
                                tableSchema={tableSchema}
                                columns={columns}
                                chooseTable={chooseTable}
                                />
                        </ListItem>
                    );
                 })}
            </List>
        </Container>
      );
}