import React from 'react';
import { observer } from 'mobx-react-lite';
import { Cell } from '../../../../common/models/Cell';
import { DataType } from '../../../../common/models/DataType';


interface CProps {
    cell: Cell;
}

export const CellComponent = observer(({cell}: CProps) => {
    return (
        <>
           {cell.type.valueOf().toString() === DataType.Text.valueOf().toString() && cell.value}
           {cell.type.valueOf().toString() === DataType.Number.valueOf().toString() && cell.value}
           {cell.type.valueOf().toString() === DataType.DatePicker.valueOf().toString() && cell.value}
        </>
      );
});