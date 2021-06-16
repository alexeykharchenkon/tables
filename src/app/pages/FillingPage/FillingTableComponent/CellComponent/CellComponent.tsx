import React from 'react';
import { observer } from 'mobx-react-lite';
import { Cell } from '../../../../common/models/Cell';
import { DataType } from '../../../../common/models/DataType';


interface CProps {
    cell: Cell;
}

export const CellComponent = observer(({cell}: CProps) => {

               
    //{cell.type === DataType.Number && cell.value}
   // {cell.type === DataType.DatePicker && 

    return (
        <>
            {cell.value}
        </>
      );
});