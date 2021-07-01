import { Row } from "@common/models/Row";
import { DataType } from "@common/models/DataType";


const requests = {
    validate: (row: Row) : boolean => {
        var isValid = true;
        row.cells.forEach(cell => {
            switch(cell.type){
                case DataType[DataType.Select]:
                    if(cell.isRequired && cell.value[0]==="") {
                        isValid = false;
                        cell.error = "Required";
                    }
                    if(cell.maxItemsSelected < cell.value.length){
                        isValid = false;
                        cell.error = cell.error + "Max Items to Select " + cell.maxItemsSelected.toString();
                    }
                    break;
                case DataType[DataType.Text]:
                     if(cell.isRequired && !Boolean(cell.value)) {
                         isValid = false;
                         cell.error = "Required";
                     }
                     if(cell.maxLength < cell.value.length) {
                         isValid = false;
                         cell.error = cell.error + "Max Length is " + cell.maxLength.toString();
                     }
                   break;
                case DataType[DataType.DatePicker]:
                    if(cell.isRequired && !Boolean(cell.value)){
                        isValid = false;
                        cell.error = "Required";
                    } 
                    break;
                case DataType[DataType.Number]:
                   if(cell.isRequired && !Boolean(cell.value)) {
                       cell.error = "Required";
                       isValid = false;
                   }
                   if(!(+cell.value < cell.maxValue)) {
                       isValid = false;
                       cell.error = cell.error + "Max Value is " + cell.maxValue.toString();
                   }
                   if(!(+cell.value > cell.minValue)) {
                       isValid = false;
                       cell.error = cell.error + "Max Value is " + cell.maxValue.toString();
                    }
                   break;
            }    
        });
        return isValid;
    },
}

export const validateService = {
    validate: (row: Row) : boolean => requests.validate(row),
}
