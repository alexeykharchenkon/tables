const requests = {
    get: () => JSON.parse(localStorage.getItem("tables") || "[]"),
    set: () => localStorage.setItem("tables", JSON.stringify("")),
}

export const tablesService = {
    load: () => requests.get(),
    save: () => requests.set()
}