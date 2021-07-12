import { DataType } from "@common/models/DataType";
import { Cell } from "@common/models/Cell";


class ValidateService  {
    validate (cells : Cell[]) : boolean {
        var isValid = true;
        cells.forEach(cell => {
            cell.error = "";
            switch(cell.type){
                case DataType[DataType.Select]:
                    if(cell.isRequired === "true" && cell.value[0]==="") {
                        isValid = false;
                        cell.error = "Required";
                    }
                    if(cell.maxItemsSelected !== "" && cell.multySelectMode && +cell.maxItemsSelected < cell.value.split('/').length){
                        isValid = false;
                        cell.error = cell.error + "Max Items to Select " + cell.maxItemsSelected;
                    }
                    break;
                case DataType[DataType.Text]:
                     if(cell.isRequired === "true" && !Boolean(cell.value)) {
                         isValid = false;
                         cell.error = "Required";
                     }
                     if(cell.maxLength !== "" && +cell.maxLength < cell.value.length) {
                         isValid = false;
                         cell.error = cell.error + "Max Length is " + cell.maxLength;
                     }
                   break;
                case DataType[DataType.DatePicker]:
                    if(cell.isRequired === "true" && !Boolean(cell.value)){
                        isValid = false;
                        cell.error = "Required";
                    } 
                    break;
                case DataType[DataType.Number]:
                   if(cell.isRequired === "true" && !Boolean(cell.value)) {
                       cell.error = "Required";
                       isValid = false;
                   }
                   if(cell.value !== "" && cell.maxValue !== "" && +cell.maxValue < +cell.value) {
                       isValid = false;
                       cell.error = cell.error + "Max Value is " + cell.maxValue;
                   }
                   if(cell.value !== "" && cell.minValue !== "" && +cell.minValue > +cell.value) {
                       isValid = false;
                       cell.error = cell.error + "Min Value is " + cell.minValue;
                    }
                   break;
            }    
        });
        return isValid;
    }
}

export const validateService = new ValidateService();