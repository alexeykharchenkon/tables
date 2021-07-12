import { useIndexedDB } from 'react-indexed-db';
import { Cell } from '@common/models/Cell';
import { Row } from '@common/models/Row';
import { Column } from '@common/models/Column';
import { TableSchema } from '@common/models/TableSchema';
import { DataTable } from '@common/models/DataTable';
import { action, runInAction} from "mobx"
import { configure } from "mobx"

configure({
    enforceActions: "never",
})

export const dbService = {
    LoadSchemas: action((tableSchemas: TableSchema [] ) => {
        const { getAll } = useIndexedDB('tableShemas');
        runInAction(() => {
            getAll().then(data => {tableSchemas.push(...data);});
        });
    }),
    LoadColumns: action((columns : Column []) => {
        const { getAll } = useIndexedDB('columns');
        runInAction(() => {
            getAll().then(data => {columns.push(...data);});
        });
    }),
    LoadDataTables: action((tables : DataTable []) => {
        const { getAll } = useIndexedDB('tables');
        runInAction(() => {
            getAll().then(data => {tables.push(...data);});
        });
    }),
    LoadCells: action((cells : Cell []) => {
        const { getAll } = useIndexedDB('cells');
        runInAction(() => {
            getAll().then(data => {cells.push(...data);});
        });
    }),
    LoadRows: action((rows : Row []) => {
        const { getAll } = useIndexedDB('rows');
        runInAction(() => {
            getAll().then(data => {rows.push(...data);});
        });
    }),
    CreateTableSchema: action((id: string, title: string) => {
        const { add } = useIndexedDB('tableShemas');
        runInAction(() => {
            add({id: id, title: title});
        });
    }),
    DeleteTableSchema: action((id: string) => {
        const { deleteRecord } = useIndexedDB('tableShemas');
        runInAction(() => {
            deleteRecord(id).then(event => {});
        });
    }),
    DeleteColumnById: action((id: string) => {
        const { deleteRecord } = useIndexedDB('columns');
        runInAction(() => {
            deleteRecord(id).then(event => {});
        });
    }),
    AddColumn: (column: Column) => {
        const { add } = useIndexedDB('columns');
        runInAction(() => {
            add({...column}).then();
        });
    },
    UpdateColumn: action((column: Column) => {
        const { update } = useIndexedDB('columns');
        runInAction(() => {
            update({...column}).then();
        });
    }),
    CreateDataTable: action((id: string, title: string, schemaId: string) => {
        const { add } = useIndexedDB('tables');
        runInAction(() => {
            add({id: id, title: title, schemaId: schemaId});
        });
    }),
    DeleteDataTable: action((id: string) => {
        const { deleteRecord } = useIndexedDB('tables');
        runInAction(() => {
            deleteRecord(id).then(event => {});
        });
    }),
    DeleteRowById: action((id: string) => {
        const { deleteRecord } = useIndexedDB('rows');
        runInAction(() => {
            deleteRecord(id).then(event => {});
        });
    }),
    AddRow: action((row: Row) => {
        const { add } = useIndexedDB('rows');
        runInAction(() => {
            add({...row}).then();
        });
    }),
    UpdateRow: action((row: Row) => {
        const { update } = useIndexedDB('rows');
        runInAction(() => {
            update({...row}).then();
        });
    }),
    AddCell: action((cell: Cell) => {
        const { add } = useIndexedDB('cells');
        runInAction(() => {
            add({...cell}).then();
        });
    }),
    DeleteCellById: action((id: string) => {
        const { deleteRecord } = useIndexedDB('cells');
        runInAction(() => {
            deleteRecord(id).then(event => {});
        });
    }),
    UpdateCell: action((cell: Cell) => {
        const { update } = useIndexedDB('cells');
        runInAction(() => {
            update({...cell}).then();
        });
    }),
}