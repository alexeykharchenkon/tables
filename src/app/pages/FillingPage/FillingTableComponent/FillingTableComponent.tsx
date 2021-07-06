import React from 'react';
import { Container, TableContainer, Paper, IconButton } from '@material-ui/core';
import { useStyles } from "@pages/FillingPage/common/styles/styles"
import { TableTitleComponent } from './TableComponent/TableTitleComponent';
import { TableComponent } from './TableComponent/TableComponent';
import { AdditionalTable } from '@common/models/AdditionalTable';
import { TableData } from '@common/models/TableData';
import DeleteIcon from '@material-ui/icons/Delete';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';


interface FillingTableProps {
    table: AdditionalTable;
    addRow: any;
    saveRow: any;
    onValueChange: any;
    editRow: any;
    deleteRow: any;
    tabData: TableData;
    activeTableId: string;
    deleteTable: any;
    cells: Cell[];
    rows: Row[];
    formatDate: any;
    formatSelect: any;
    helperText: any;
    cancelAddRow: any;
}

export const FillingTableComponent = ({table, addRow, saveRow, 
    onValueChange, editRow, deleteRow, tabData, activeTableId, 
    deleteTable, cells, rows, formatDate, formatSelect,
    helperText, cancelAddRow}: FillingTableProps) => {
    const classes = useStyles();
    return (
        <Container className={classes.fillingTable}>
            <IconButton style={{marginTop: '-10px'}}
                 onClick={() => deleteTable(table.id, tabData.id)}
            >
                <DeleteIcon />
            </IconButton>
            <TableContainer component={Paper}  className={classes.fillingTableTable}>
                <TableTitleComponent 
                    table={table}
                    tabData={tabData} 
                    addRow={addRow} 
                />
                <TableComponent 
                    tabData={tabData}
                    table={table}
                    saveRow={saveRow}
                    onValueChange={onValueChange}
                    editRow={editRow}
                    deleteRow={deleteRow}
                    activeTableId={activeTableId}
                    cells={cells}
                    rows={rows}
                    formatDate={formatDate}
                    formatSelect={formatSelect}
                    helperText={helperText}
                    cancelAddRow={cancelAddRow}
                />
            </TableContainer>
        </Container>
      );
}