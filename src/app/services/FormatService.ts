import { DataType } from "@common/models/DataType";
import { Cell } from "@app/common/models/Cell";

export class formatService {
    static checkForbidSymbols(value: string, forbiddenSymbols: string) : string {
        var forbidSymbArray = forbiddenSymbols.split(',');
        for(var str of forbidSymbArray) 
            value = value.split(str).join('');
        return value;
    }
    static formatDate (value: any, dateFormat: string) : string {
        const pad = (s: any): string => { return (s < 10) ? '0' + s : s; }
        var d = new Date(value);

        switch(dateFormat){
            case "dd/MM/yyyy":
                return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
            case "MM/dd/yyyy":
                return [pad(d.getMonth()+1), pad(d.getDate()), d.getFullYear()].join('/');
            case "yyyy/MM/dd":
                return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('/');
            case "yyyy/dd/MM":
                return [d.getFullYear(), pad(d.getDate()), pad(d.getMonth()+1)].join('/');
        }
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
    }
    static formatHelperText (cell: Cell): string {
        var value = "";
        switch(cell.type){
            case DataType[DataType.Text]:
                if(cell.isRequired) value += "Required ";
                if(cell.maxLength !== "") value += "Max Length " + cell.maxLength;
                break;
            case DataType[DataType.Select]:
                if(cell.isRequired) value += "Required ";
                if(cell.maxItemsSelected !== "" && cell.multySelectMode)value += "Max Select Items " + cell.maxItemsSelected;
                break;
            case DataType[DataType.DatePicker]:
                if(cell.isRequired) value += "Required ";
                break;
            case DataType[DataType.Number]:
                if(cell.isRequired) value += "Required ";
                if(cell.maxValue!== "") value += "Max Value " + cell.maxValue;
                if(cell.minValue!== "") value += " Min Value " + cell.minValue;
                break;
        }    
        return value;
    }
}