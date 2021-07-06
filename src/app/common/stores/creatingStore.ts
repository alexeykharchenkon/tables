import { makeAutoObservable } from "mobx";
import { tableService } from "@common/services/TableService";
import { TableStore } from "@common/stores/tableStore";
import { creatingStoreService } from "@common/services/CreatingStoreService";
import { Types } from "@common/models/Types";
import { TableSchema } from "@common/models/TableSchema";
import { Column } from "@common/models/Column";
import { dbService } from "@common/services/DBService";
import { Guid } from "guid-typescript";
import { Modes } from "@common/models/Modes";

export class CreatingStore {
    tableStore: TableStore;  
    tableTitleValue: string = "";
    selectValue: string = "";

    modes: Modes = {
        selectMode: false,
        editMode: false,
        textMode: false,
        dateMode: false,
        numberMode: false,
    }
    
    tableSchemas: TableSchema[] = [];
    columns: Column[] = [];
    activeTableSchema: TableSchema = {id: "", title: ""}
    activeColumn: Column = {
        id: "",
        type: "",
        label: "",
        selectOptions: [],
        forbiddenSymbols: "",
        multySelectMode: "Single",
        dateFormat: "",
        isRequired: false,
        maxLength: "",
        maxItemsSelected: "",
        minValue: "",
        maxValue: "",
    };

    constructor(tableStore: TableStore){
        makeAutoObservable(this);
        this.tableStore = tableStore;
    }

    loadSchemas = () => { 
        dbService.LoadSchemas(this.tableSchemas);
        dbService.LoadColumns(this.columns);
    }

    createTable = () => {
       this.activeTableSchema.id = Guid.create().toString();
       this.activeTableSchema.title = this.tableTitleValue;
       this.tableSchemas.push(this.activeTableSchema);
       dbService.CreateTableSchema(this.activeTableSchema);
    }

    deleteTable = (tableId: string) => {
        this.tableStore.tables = this.tableStore.tables.filter(tab => tab.id !== tableId);
        tableService.save(this.tableStore.tables);
    }

    addColumn = () => {
        this.activeColumn.id = Guid.create().toString();
        dbService.AddColumn(this.activeTableSchema.id, this.activeColumn);
        this.columns.push(this.activeColumn);
        this.activeColumn = {
            id: Guid.create().toString(),
            type: "",
            label: "",
            selectOptions: [],
            forbiddenSymbols: "",
            multySelectMode: "Single",
            dateFormat: "",
            isRequired: false,
            maxLength: "",
            maxItemsSelected: "",
            minValue: "",
            maxValue: "",
        };

        creatingStoreService.makeModesFalse(this.modes);
    }

    deleteColumn = (columnId: string) => {
        dbService.DeleteColumnById(columnId);
        this.columns = this.columns.filter(col => col.id !== columnId);
    }

    editColumn = (tableId: string, columnId: string, value: string, type: string, selectType: boolean) => {
      //  creatingStoreService.editColumn(this.tableStore.tables, tableId, columnId, value, type, selectType);
    }

    saveEditedColumn = (tableId: string) => {
     //   fillingStoreService.cancelAddRow(this.tableStore.tables, tableId);
     //   creatingStoreService.saveEditedColumn(this.tableStore.tables, tableId);
     //   tableService.save(this.tableStore.tables);
    }

    addSelectField = () => {
        this.activeColumn.selectOptions.push(this.selectValue);
        this.selectValue = "";
        this.activeColumn = {...this.activeColumn};
    }

    deleteSelectField = (index: number) => {
         this.activeColumn.selectOptions.splice(index,1);
         this.activeColumn = {...this.activeColumn};
    }

     OnValueChange = (value: any, changeType: string) => {
         switch(changeType){
             case Types[Types.ISREQUIREDCHANGE]:
                this.activeColumn = {...this.activeColumn, [value.target.name] : value.target.checked}
                break;
           case Types[Types.SELECTVALUECHANGE]:
                this.selectValue = value.target.value;
                break;
            case Types[Types.COLUMNTYPEVALUECHANGE]:
                this.activeColumn = {...this.activeColumn, [value.target.name] : value.target.value}
                creatingStoreService.switchSelectMode(this.modes, value.target.value);
                break;
            case Types[Types.TITLECHANGE]:
                this.tableTitleValue = value.target.value;
                break;
            default:
                this.activeColumn = {...this.activeColumn, [value.target.name] : value.target.value}
                break;
         } 
     }
}