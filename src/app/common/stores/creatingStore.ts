import { makeAutoObservable } from "mobx";
import { tableService } from "@common/services/TableService";
import { TableStore } from "@common/stores/tableStore";
import { creatingStoreService } from "@common/services/CreatingStoreService";
import { fillingStoreService } from "@common/services/FillingStoreService";
import { Types } from "@common/models/Types";
import { TableSchema } from "@common/models/TableSchema";
import { Column } from "@common/models/Column";
import { dbService } from "@common/services/DBService";
import { Guid } from "guid-typescript";

export class CreatingStore {
    tableStore: TableStore;  
    tableTitleValue: string = "";

    ///////////////////////////////////////////////////
    tableSchemas: TableSchema[] = [];
    columns: Column[] = [];
    activeTableSchema: TableSchema = {id: "", title: ""}
    activeColumn: Column = {
        id: "",
        type: "",
        label: "",
        selectOptions: [""],
        forbiddenSymbols: "",
        multySelectMode: false,
        dateFormat: "",
        isRequired: false,
        maxLength: "",
        maxItemsSelected: "",
        minValue: "",
        maxValue: "",
    };
    ////////////////////////////////////////////////////////

    constructor(tableStore: TableStore){
        makeAutoObservable(this);
        this.tableStore = tableStore;
    }

    loadSchemas = () => { 
        dbService.LoadSchemas(this.tableSchemas);
        dbService.LoadColumns(this.columns);
    }

    createTable = () => {
       /////////////////////////////////////////////////////
       this.activeTableSchema.id = Guid.create().toString();
       this.activeTableSchema.title = this.tableTitleValue;
       this.tableSchemas.push(this.activeTableSchema);
       dbService.CreateTableSchema(this.activeTableSchema);
       //////////////////////////////////////////////////////
        creatingStoreService.createTable(this.tableStore.tables, this.tableTitleValue);
        this.tableTitleValue = "";
        tableService.save(this.tableStore.tables);
    }

    deleteTable = (tableId: string) => {
        this.tableStore.tables = this.tableStore.tables.filter(tab => tab.id !== tableId);
        tableService.save(this.tableStore.tables);
    }

    addColumn = (tableId: string) => {
        ///////////////////////////////////////////////
        this.activeColumn.id = Guid.create().toString();
        dbService.AddColumn(this.activeTableSchema.id, this.activeColumn);
        this.columns.push(this.activeColumn);
        this.activeColumn = {
            id: Guid.create().toString(),
            type: "",
            label: "",
            selectOptions: [""],
            forbiddenSymbols: "",
            multySelectMode: false,
            dateFormat: "",
            isRequired: false,
            maxLength: "",
            maxItemsSelected: "",
            minValue: "",
            maxValue: "",
        };
        /////////////////////////////////////////////////
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
        creatingStoreService.addColumn(this.tableStore.tables, tableId);
        tableService.save(this.tableStore.tables);
    }

    deleteColumn = (tableId: string, columnId: string) => {
        ////////////////////////////////
        dbService.DeleteColumnById(columnId);
        this.columns = this.columns.filter(col => col.id !== columnId);
        ///////////////////////////////
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
        creatingStoreService.deleteColumn(this.tableStore.tables, tableId, columnId);
        tableService.save(this.tableStore.tables);
    }

    editColumn = (tableId: string, columnId: string, value: string, type: string, selectType: boolean) => {
        creatingStoreService.editColumn(this.tableStore.tables, tableId, columnId, value, type, selectType);
    }

    saveEditedColumn = (tableId: string) => {
        fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
        creatingStoreService.saveEditedColumn(this.tableStore.tables, tableId);
        tableService.save(this.tableStore.tables);
    }

    addSelectField = (tabId: string) => {
        creatingStoreService.addSelectField(this.tableStore.tables, tabId);
    }

    deleteSelectField = (tabId: string, index: number) => {
        this.tableStore.tables.filter(tab => tab.id === tabId)
        .forEach(tab => {
            tab.selectOptions = tab.selectOptions.filter((x, i) => i !== index);
        });  
    }

     OnValueChange = (value: any, tabId: string, changeType: string) => {
         switch(changeType){
             case Types[Types.ISREQUIREDCHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].isRequired = value.target.checked;
                break;
             case Types[Types.FORRBIDDENCHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].forbiddenSymbols = value.target.value;
                break;
            case Types[Types.DATEFORMATCHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].dateFormat = value.target.value;
                break;
            case Types[Types.SELECTMODECHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].selectTypeValue = value.target.value;
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].multySelectMode = value.target.value === "1" ? true : false;        
                break;
           case Types[Types.SELECTVALUECHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].selectValue = value.target.value;
                break;
            case Types[Types.COLUMNVALUECHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].columnValue = value.target.value;
                ////////////
                this.activeColumn.label = value.target.value;
                ////////////
                break;
            case Types[Types.COLUMNTYPEVALUECHANGE]:
                //////////////////
                this.activeColumn.type = value.target.value;
                //////////////////////////
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].columnTypeValue = value.target.value;
                creatingStoreService.switchSelectMode(this.tableStore.tables, tabId, value.target.value);
                break;
            case Types[Types.TITLECHANGE]:
                this.tableTitleValue = value.target.value;
                break;
            case Types[Types.MAXLENGTHCHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].maxLength = value.target.value;
                break;
            case Types[Types.MAXVALUECHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].maxValue = value.target.value;
                break;
            case Types[Types.MINVALUECHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].minValue = value.target.value;
                break;
            case Types[Types.MAXITEMSELECTEDCHANGE]:
                this.tableStore.tables.filter(tab => tab.id === tabId)[0].maxItemsSelected = value.target.value;
                break;
         } 
     }
}