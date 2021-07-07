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
    
    activeTableSchema: TableSchema = {id: "", title: ""}
    activeColumn: Column = {
        id: "",
        schemaId: "",
        type: "",
        label: "",
        selectOptions: "",
        forbiddenSymbols: "",
        multySelectMode: "Single",
        dateFormat: "",
        isRequired: "false",
        maxLength: "",
        maxItemsSelected: "",
        minValue: "",
        maxValue: "",
    };

    constructor(tableStore: TableStore){
        makeAutoObservable(this);
        this.tableStore = tableStore;  
        this.tableStore.loadData();
    }

    createTable = () => {
       this.activeTableSchema.id = Guid.create().toString();
       this.activeTableSchema.title = this.tableTitleValue;
       this.tableStore.tableSchemas.push(this.activeTableSchema);
       dbService.CreateTableSchema(this.activeTableSchema);
    }

    deleteTable = (tableId: string) => {
        this.tableStore.tables = this.tableStore.tables.filter(tab => tab.id !== tableId);
        tableService.save(this.tableStore.tables);
    }

    addColumn = () => {
        console.log(this.activeTableSchema.id)
        this.activeColumn.id = Guid.create().toString();
        this.activeColumn.schemaId = this.activeTableSchema.id;
        dbService.AddColumn(this.activeColumn);
        this.tableStore.columns.push(this.activeColumn);
        creatingStoreService.makeModesFalse(this.modes);
        this.setActiveColumnToDefault();
    }

    deleteColumn = (id: string) => {
        dbService.DeleteColumnById(id);
        this.tableStore.columns = this.tableStore.columns.filter(col => col.id !== id);
    }

    editColumn = (id: string) => {
        this.modes.editMode = true;
        this.activeColumn = this.tableStore.columns?.find(col => col.id === id) as Column;
        creatingStoreService.switchSelectMode(this.modes, this.activeColumn.type);
    }

    saveEditedColumn = () => {
        this.modes.editMode = false;
        dbService.UpdateColumn(this.activeColumn);
        creatingStoreService.updateColumns(this.tableStore.columns, this.activeColumn);
        creatingStoreService.makeModesFalse(this.modes);
        this.setActiveColumnToDefault();
    }

    addSelectField = () => {
        this.activeColumn.selectOptions += "/" + this.selectValue;
        this.selectValue = "";
        this.activeColumn = {...this.activeColumn};
    }

    deleteSelectField = (index: number) => {
         let selOpt = this.activeColumn.selectOptions.split('/');
         selOpt.splice(index,1);
         this.activeColumn.selectOptions = selOpt.join('/');
         this.activeColumn = {...this.activeColumn};
    }

     OnValueChange = (value: any, changeType: string) => {
         switch(changeType){
             case Types[Types.ISREQUIREDCHANGE]:
                this.activeColumn = {...this.activeColumn, [value.target.name] : value.target.checked ? "true" : "false" }
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

     setActiveColumnToDefault = () => {
        this.activeColumn = {
            id: Guid.create().toString(),
            schemaId: "",
            type: "",
            label: "",
            selectOptions: "",
            forbiddenSymbols: "",
            multySelectMode: "Single",
            dateFormat: "",
            isRequired: "false",
            maxLength: "",
            maxItemsSelected: "",
            minValue: "",
            maxValue: "",
        };
    }
}