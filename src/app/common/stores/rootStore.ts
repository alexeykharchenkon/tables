import { createContext, useContext } from "react";
import { CreatingStore } from "./creatingStore";
import { FillingStore } from "./filllingStore";
import { TableStore } from "./tableStore";
import { initDB } from 'react-indexed-db';
import { DBConfig } from '@common/config/DBConfig';


initDB(DBConfig);

interface RootStore {
    tableStore: TableStore;
    creatingStore: CreatingStore;
    fillingStore: FillingStore;
}

const tableStore = new TableStore();
tableStore.loadTables();

const creatingStore = new CreatingStore(tableStore);
creatingStore.loadSchemas();

export const rootStore: RootStore = {
    tableStore,
    creatingStore,
    fillingStore : new FillingStore(tableStore),
}

export const StoreContext = createContext(rootStore);

export function useStore() {
    return useContext(StoreContext);
}