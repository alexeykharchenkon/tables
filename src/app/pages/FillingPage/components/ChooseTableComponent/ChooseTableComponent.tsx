import React from 'react';
import Container from '@material-ui/core/Container';
import { useStyles } from "@pages/FillingPage/common/styles/styles";
import { List, ListItem, Typography, Paper } from '@material-ui/core';
import { DataTable } from '@common/models/DataTable';

interface ChooseTableProps {
    tables: DataTable[];
    chooseTable: any;
    activeSchemaId: string;
}

export const ChooseTableComponent = ({tables, chooseTable, activeSchemaId} : ChooseTableProps) => {
    const classes = useStyles();

    return (
        <Container className={classes.chooseTable}>
            <Container><h3>Choose Table to Fill</h3></Container>
            <List className={classes.chooseTableList}>
                {tables.map(table => (
                   activeSchemaId === table.schemaId && 
                        <ListItem key={table.id} className={classes.chooseTableListItem}>
                           <Container
                                component={Paper}
                                className={classes.fillingTableCo}
                                onClick={()=> chooseTable(table.id)}
                           >
                                <Typography variant="h6">
                                    {table.title}
                                </Typography>
                           </Container>
                        </ListItem>
                ))}
            </List>
        </Container>
      );
}