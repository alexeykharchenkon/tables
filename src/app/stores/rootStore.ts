import { createContext, useContext } from "react";
import { TableStore } from "./tableStore";

interface RootStore {
    tableStore: TableStore
}

export const rootStore: RootStore = {
    tableStore: new TableStore(),
}

export const StoreContext = createContext(rootStore);

export function useStore() {
    return useContext(StoreContext);
}