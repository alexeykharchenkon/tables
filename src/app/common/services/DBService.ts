import { useIndexedDB } from 'react-indexed-db';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';
import { Column } from '@common/models/Column';
import { TableSchema } from '@common/models/TableSchema';

export const dbService = {
    LoadSchemas: (tableSchemas: TableSchema [] ) => {
        const { getAll } = useIndexedDB('tableShemas');
        getAll().then(data => {tableSchemas.push(...data);});
    },
    LoadColumns: (columns : Column []) => {
        const { getAll } = useIndexedDB('columns');
        getAll().then(data => {columns.push(...data);});
    },
    CreateTableSchema: (schema: TableSchema) => {
        const { add } = useIndexedDB('tableShemas');
        add({id: schema.id, title: schema.title});
    },
    DeleteColumnById: (id: string) => {
        const { deleteRecord } = useIndexedDB('columns');
        deleteRecord(id).then(event => {});
    },
    AddColumn: (column: Column) => {
        const { add } = useIndexedDB('columns');
            add({...column}).then();
    },
    UpdateColumn: (column: Column) => {
        const { update } = useIndexedDB('columns');
            update({...column}).then();
    },
    GetColumnById: (column: Column, id: string) => {
        const { getByIndex } = useIndexedDB('columns');

        getByIndex('id', id).then(data => {
            column.id = data.id;
            column.schemaId = data.schemaId;
            column.label= data.label;
            column.type = data.type;
            column.selectOptions = data.selectOptions;
            column.forbiddenSymbols = data.forbiddenSymbols;
            column.multySelectMode = data.multySelectMode;
            column.dateFormat = data.dateFormat;
            column.isRequired = data.isRequired;
            column.maxLength = data.maxLength;
            column.maxItemsSelected = data.maxItemsSelected;
            column.minValue = data.minValue;
            column.maxValue = data.maxValue;
        });      
    },
    GetCellsByRowId : (id: string) : Cell[] => {
        const cellsArray: Cell[] = [];
        const { getAll } = useIndexedDB('cells');
        getAll().then( cells => {
            cells.forEach(cell => {
                if(cell.rowId === id)cellsArray.push(cell);
            });
        });
        
        return cellsArray;
    },
    GetRowsByTableId : (id: string) : any => {
        const rowsArray: Row[] = [];
        const { getAll } = useIndexedDB('rows');
        getAll().then( rows => {
            rows.forEach(row => {
                if(row.tableId === id)rows.push(row);
            });
        });
        return rowsArray;
    },
    AddTable: (tableId: string, title: string) => {
        const { add } = useIndexedDB('tables');
        add({id: tableId, title: title});
    },
    AddRow: (cells: Cell[], rowId: string, tableId: string) => {
        const { add } = useIndexedDB('rows');
        add({id: rowId, tableId: tableId});
        dbService.AddCells(cells, rowId, tableId);
    },
    AddCells : (cells: Cell[], rowId: string, tableId: string) => {
        const { add } = useIndexedDB('cells');
        for(let cel of cells){
            add({ 
                id: cel.id,
                rowId: rowId,
                tableId: tableId,
                type: cel.type,
                value: cel.value,
                selectOptions: cel.selectOptions,
                forbiddenSymbols: cel.forbiddenSymbols,
                multySelectMode: cel.multySelectMode,
                dateFormat: cel.dateFormat,
                isRequired: cel.isRequired,
                maxLength: cel.maxLength,
                maxItemsSelected: cel.maxItemsSelected,
                minValue: cel.minValue,
                maxValue: cel.maxValue,
                error: cel.error,
            }).then();
        }
    },
    UpdateRow: (cells: Cell[], rowId: string, tableId: string) => {
        const { update } = useIndexedDB('rows');
        update({id: rowId, tableId: tableId});
        dbService.UpdateCells(cells, rowId, tableId);
    },
    UpdateCells : (cells: Cell[], rowId: string, tableId: string) => {
        const { update } = useIndexedDB('cells');
        for(let cel of cells){
            update({ 
                id: cel.id,
                rowId: rowId,
                tableId: tableId,
                type: cel.type,
                value: cel.value,
                selectOptions: cel.selectOptions,
                forbiddenSymbols: cel.forbiddenSymbols,
                multySelectMode: cel.multySelectMode,
                dateFormat: cel.dateFormat,
                isRequired: cel.isRequired,
                maxLength: cel.maxLength,
                maxItemsSelected: cel.maxItemsSelected,
                minValue: cel.minValue,
                maxValue: cel.maxValue,
                error: cel.error,
            }).then();
        }
    },
}