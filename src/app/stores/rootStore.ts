import { createContext, useContext } from "react";
import { ColumnStore } from "./columnStore";
import { TableStore } from "./tableStore";

interface RootStore {
    tableStore: TableStore;
    columnStore: ColumnStore;
}

const tableStore = new TableStore();
//tableStore.loadTables();

export const rootStore: RootStore = {
    tableStore,
    columnStore: new ColumnStore(tableStore),
}

export const StoreContext = createContext(rootStore);

export function useStore() {
    return useContext(StoreContext);
}