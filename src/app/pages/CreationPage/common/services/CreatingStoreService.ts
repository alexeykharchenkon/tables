import { DataType } from "@common/models/DataType";
import { Modes } from "@common/models/Modes";

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
}

export const creatingStoreService = new CreatingStoreService();