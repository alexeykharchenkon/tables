import { useIndexedDB } from 'react-indexed-db';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';
import { Column } from '@common/models/Column';
import { TableSchema } from '@common/models/TableSchema';
import { DataTable } from '@common/models/DataTable';

export const dbService = {
    LoadSchemas: (tableSchemas: TableSchema [] ) => {
        const { getAll } = useIndexedDB('tableShemas');
        getAll().then(data => {tableSchemas.push(...data);});
    },
    LoadColumns: (columns : Column []) => {
        const { getAll } = useIndexedDB('columns');
        getAll().then(data => {columns.push(...data);});
    },
    LoadDataTables: (tables : DataTable []) => {
        const { getAll } = useIndexedDB('tables');
        getAll().then(data => {
            tables.splice(0);
            tables.push(...data);
        });
    },
    LoadCells: (cells : Cell []) => {
        const { getAll } = useIndexedDB('cells');
        getAll().then(data => {cells.push(...data);});
    },
    LoadRows: (rows : Row []) => {
        const { getAll } = useIndexedDB('rows');
        getAll().then(data => {rows.push(...data);});
    },
    CreateTableSchema: (id: string, title: string) => {
        const { add } = useIndexedDB('tableShemas');
        add({id: id, title: title});
    },
    DeleteTableSchema: (id: string) => {
        const { deleteRecord } = useIndexedDB('tableShemas');
        deleteRecord(id).then(event => {});
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
    CreateDataTable: (id: string, title: string, schemaId: string) => {
        const { add } = useIndexedDB('tables');
        add({id: id, title: title, schemaId: schemaId});
    },
    DeleteDataTable: (id: string) => {
        const { deleteRecord } = useIndexedDB('tables');
        deleteRecord(id).then(event => {});
    },
    DeleteRowById: (id: string) => {
        const { deleteRecord } = useIndexedDB('rows');
        deleteRecord(id).then(event => {});
    },
    AddRow: (row: Row) => {
        const { add } = useIndexedDB('rows');
            add({...row}).then();
    },
    UpdateRow: (row: Row) => {
        const { update } = useIndexedDB('rows');
            update({...row}).then();
    },
    AddCell: (cell: Cell) => {
        const { add } = useIndexedDB('cells');
            add({...cell}).then();
    },
    DeleteCellById: (id: string) => {
        const { deleteRecord } = useIndexedDB('cells');
        deleteRecord(id).then(event => {});
    },
    UpdateCell: (cell: Cell) => {
        const { update } = useIndexedDB('cells');
            update({...cell}).then();
    },
}