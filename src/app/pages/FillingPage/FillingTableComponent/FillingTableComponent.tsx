import React from 'react';
import { Container, TableContainer, Paper, IconButton } from '@material-ui/core';
import { useStyles } from "@common/styles/styles";
import { TableTitleComponent } from './TableComponent/TableTitleComponent';
import { TableComponent } from './TableComponent/TableComponent';
import { AdditionalTable } from '@app/common/models/AdditionalTable';
import { TableData } from '@app/common/models/TableData';
import DeleteIcon from '@material-ui/icons/Delete';
import { Cell } from '@app/common/models/Cell';
import { Row } from '@app/common/models/Row';


interface FillingTableProps {
    table: AdditionalTable;
    addRow: any;
    saveRow: any;
    cellValueChange: any;
    editRow: any;
    deleteRow: any;
    tabData: TableData;
    activeTableId: string;
    deleteTable: any;
    selectValueChange: any;
    checkboxValueChange: any;
    cells: Cell[];
    rows: Row[];
    handleDateChange: any;
    formatDate: any;
    formatSelect: any;
}

export const FillingTableComponent = ({table, addRow, saveRow, 
    cellValueChange, editRow, deleteRow, tabData, activeTableId, 
    deleteTable, selectValueChange, checkboxValueChange, cells, rows,
    handleDateChange, formatDate, formatSelect}: FillingTableProps) => {
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
                    cellValueChange={cellValueChange}
                    editRow={editRow}
                    deleteRow={deleteRow}
                    activeTableId={activeTableId}
                    selectValueChange={selectValueChange}
                    checkboxValueChange={checkboxValueChange}
                    cells={cells}
                    rows={rows}
                    handleDateChange={handleDateChange}
                    formatDate={formatDate}
                    formatSelect={formatSelect}
                />
            </TableContainer>
        </Container>
      );
}