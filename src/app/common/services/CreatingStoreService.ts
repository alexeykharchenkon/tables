import { DataType } from "@common/models/DataType";
import { Modes } from "@common/models/Modes";
import { Column } from "@common/models/Column";

class CreatingStoreService {
    switchSelectMode (modes: Modes, value: string) {
        switch(value){
            case DataType[DataType.Text]:
                creatingStoreService.makeModesFalse(modes);
                modes.textMode = true;
                break;
            case DataType[DataType.DatePicker]:
                creatingStoreService.makeModesFalse(modes);
                modes.dateMode = true;
                break;
            case DataType[DataType.Select]:
                creatingStoreService.makeModesFalse(modes);
                modes.selectMode = true;
                break;
            case DataType[DataType.Number]:
                creatingStoreService.makeModesFalse(modes);
                modes.numberMode = true;
                break;
            case DataType[DataType.Checkbox]:
                creatingStoreService.makeModesFalse(modes);
                break;
            default:
                creatingStoreService.makeModesFalse(modes);
                break;
        }
    }
    makeModesFalse (modes: Modes) {
        modes.selectMode = false;
        modes.dateMode = false;
        modes.textMode = false;
        modes.numberMode = false;
    }
    updateColumns(columns: Column[], column: Column) {
        columns.filter(col => col.id === column.id)
        .forEach(col => {
            col.id = column.id;
            col.schemaId = column.schemaId;
            col.type = column.type;
            col.label =  column.label;
            col.selectOptions =  column.selectOptions;
            col.forbiddenSymbols = column.forbiddenSymbols;
            col.multySelectMode =  column.multySelectMode;
            col.dateFormat = column.dateFormat;
            col.isRequired =  column.isRequired;
            col.maxLength =   column.maxLength;
            col.maxItemsSelected = column.maxItemsSelected;
            col.minValue = column.minValue;
            col.maxValue = column.maxValue;
        });
       
    }
}

export const creatingStoreService = new CreatingStoreService();