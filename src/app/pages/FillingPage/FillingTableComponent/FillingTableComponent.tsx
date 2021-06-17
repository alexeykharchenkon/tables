import React from 'react';
import { Container, TableContainer, Paper } from '@material-ui/core';
import { useStyles } from "@common/styles/styles"
import { TableModel } from '@common/models/TableModel';
import { TableTitleComponent } from './TableComponent/TableTitleComponent';
import { TableComponent } from './TableComponent/TableComponent';
import { Row } from '@common/models/Row';


interface FillingTableProps {
    table: TableModel;
    addRow: any;
    saveRow: any;
    activeRow: Row;
    cellValueChange: any;
    addEditRowMode: boolean;
    editRow: any;
    deleteRow: any;
}

export const FillingTableComponent = ({table, addRow, saveRow, 
    activeRow, cellValueChange, addEditRowMode, editRow, 
    deleteRow}: FillingTableProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingTable}>
            <TableContainer component={Paper}>
                <TableTitleComponent table={table} addRow={addRow} />
                <TableComponent 
                    table={table}
                    saveRow={saveRow}
                    activeRow={activeRow}
                    cellValueChange={cellValueChange}
                    addEditRowMode={addEditRowMode}    
                    editRow={editRow}
                    deleteRow={deleteRow}
                />
            </TableContainer>
        </Container>
      );
}