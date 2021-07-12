import { makeAutoObservable } from "mobx";
import { TableStore } from "@common/stores/tableStore";
import { creatingStoreService } from "@pages/CreationPage/common/services/CreatingStoreService";
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
        type: "",
        label: "",
        selectOptions: "",
        forbiddenSymbols: "",
        multySelectMode: "Single",
        dateFormat: "dd/MM/yyyy",
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

    addDeleteTable = (type: string) => {
        switch(type){
            case Types[Types.ADDTABLE]:
                this.activeTableId = Guid.create().toString();
                this.tableStore.tableSchemas.push({id: this.activeTableId, title: this.tableTitleValue});
                dbService.CreateTableSchema(this.activeTableId, this.tableTitleValue);
                this.tableTitleValue = "";
                break;
            case Types[Types.DELETETABLE]:
                this.tableStore.tableSchemas = this.tableStore.tableSchemas.filter(tab => tab.id !== this.activeTableId);
                dbService.DeleteTableSchema(this.activeTableId);
                this.activeTableId= "";
                break;
        }
    }
    
    crudColumn = (type: string, id: string) => {
        switch(type){
            case Types[Types.ADDCOLUMN]:
                if(this.activeColumn.type !== "" && this.activeColumn.label !== ""){
                    this.activeColumn.id = Guid.create().toString();
                    this.activeColumn.schemaId = this.activeTableId;
                    this.tableStore.UpdateData(this.activeTableId, this.activeColumn, id, Types[Types.UPDATEDATAADDCOLUMN]);
                    creatingStoreService.makeModesFalse(this.modes);
                    this.setActiveColumnToDefault();
                }
                break;
            case Types[Types.DELETECOLUMN]:        
                this.tableStore.UpdateData(this.activeTableId, this.activeColumn, id, Types[Types.UPDATEDATADELETECOLUMN]);
            break;
            case Types[Types.EDITCOLUMN]:
                this.modes.editMode = true;
                this.activeColumn = this.tableStore.columns?.find(col => col.id === id) as Column;
                creatingStoreService.switchSelectMode(this.modes, this.activeColumn.type);        
            break;
            case Types[Types.SAVECOLUMN]:
                    this.modes.editMode = false;
                    this.tableStore.UpdateData(this.activeTableId, this.activeColumn, id, Types[Types.UPDATEDATAUPDATECOLUMN]);
                    creatingStoreService.updateColumns(this.tableStore.columns, this.activeColumn);
                    creatingStoreService.makeModesFalse(this.modes);
                    this.setActiveColumnToDefault();
                    this.tableStore.columns = this.tableStore.columns.filter(col => col.id !== "");
            break;
        }
    }

    addDeleteSelectField = (type: string, index: number) => {
        switch(type){
            case Types[Types.ADDSELECTFIELD]:
                this.activeColumn.selectOptions += "/" + this.selectValue;
                this.selectValue = "";
                this.activeColumn = {...this.activeColumn};
            break;
            case Types[Types.DELETESELECTFIELD]:
                let selOpt = this.activeColumn.selectOptions.split('/');
                selOpt.splice(index,1);
                this.activeColumn.selectOptions = selOpt.join('/');
                this.activeColumn = {...this.activeColumn};
            break;
        }
    }
    
     OnValueChange = (e: any, changeType: string) => {
         const {name, value} = e.target;
         switch(changeType){
             case Types[Types.ISREQUIREDCHANGE]:
                this.activeColumn = {...this.activeColumn, [name] : e.target.checked ? "true" : "false" }
                break;
           case Types[Types.SELECTVALUECHANGE]:
                this.selectValue = value;
                break;
            case Types[Types.COLUMNTYPEVALUECHANGE]:
                this.activeColumn = {...this.activeColumn, [name] : value}
                creatingStoreService.switchSelectMode(this.modes, value);
                break;
            case Types[Types.TITLECHANGE]:
                this.tableTitleValue = value;
                break;
            default:
                this.activeColumn = {...this.activeColumn, [name] : value}
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