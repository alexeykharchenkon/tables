import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@pages/FillingPage/common/styles/styles";
import { List, ListItem } from '@material-ui/core';
import { TableBodyComponent } from './TableBodyComponent';
import { TableSchema } from '@common/models/TableSchema';
import { Column } from '@common/models/Column';

interface ChooseTableSchemaProps {
    tableSchemas: TableSchema[];
    columns: Column[];
    chooseTable: any;
}

export const ChooseTableSchemaComponent = ({tableSchemas, columns, chooseTable} : ChooseTableSchemaProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.chooseTable}>
            <Container><h3>Choose Schema</h3></Container>
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