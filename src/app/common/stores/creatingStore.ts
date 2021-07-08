import { makeAutoObservable } from "mobx";
import { TableStore } from "@common/stores/tableStore";
import { creatingStoreService } from "@common/services/CreatingStoreService";
import { Types } from "@common/models/Types";
import { Column } from "@common/models/Column";
import { dbService } from "@common/services/DBService";
import { Guid } from "guid-typescript";
import { Modes } from "@common/models/Modes";

export class CreatingStore {
    tableStore: TableStore;  
    tableTitleValue: string = "";
    selectValue: string = "";
    activeTableId: string = "";

    modes: Modes = {
        selectMode: false,
        editMode: false,
        textMode: false,
        dateMode: false,
        numberMode: false,
    }
    
    activeColumn: Column = {
        id: "",
        schemaId: "",
        type: "Text",
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
    }

    chooseTable = (id: string) => {
        this.activeTableId = id;
    }

    createTable = () => {
       this.activeTableId = Guid.create().toString();
       this.tableStore.tableSchemas.push({id: this.activeTableId, title: this.tableTitleValue});
       dbService.CreateTableSchema(this.activeTableId, this.tableTitleValue);
       this.tableTitleValue = "";
    }

    deleteTable = () => {
        this.tableStore.tableSchemas = this.tableStore.tableSchemas.filter(tab => tab.id !== this.activeTableId);
        dbService.DeleteTableSchema(this.activeTableId);
        this.activeTableId= "";
    }

    addColumn = () => {
        this.activeColumn.id = Guid.create().toString();
        this.activeColumn.schemaId = this.activeTableId;
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
            type: "Text",
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