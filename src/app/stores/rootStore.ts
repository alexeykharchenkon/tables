import { createContext, useContext } from "react";
import { ColumnStore } from "./creatingStore";
import { FillingStore } from "./filllingStore";
import { TableStore } from "./tableStore";

interface RootStore {
    tableStore: TableStore;
    creatingStore: ColumnStore;
    fillingStore: FillingStore;
}

const tableStore = new TableStore();
tableStore.loadTables();

export const rootStore: RootStore = {
    tableStore,
    creatingStore: new ColumnStore(tableStore),
    fillingStore : new FillingStore(tableStore),
}

export const StoreContext = createContext(rootStore);

export function useStore() {
    return useContext(StoreContext);
}