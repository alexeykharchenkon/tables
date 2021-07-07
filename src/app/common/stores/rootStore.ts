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
//tableStore.loadData();

const creatingStore = new CreatingStore(tableStore);
const fillingStore = new FillingStore(tableStore);

export const rootStore: RootStore = {
    tableStore,
    creatingStore,
    fillingStore,
}

export const StoreContext = createContext(rootStore);

export function useStore() {
    return useContext(StoreContext);
}