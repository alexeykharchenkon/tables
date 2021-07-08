export const DBConfig = {
    name: 'MyDB',
    version: 1,
    objectStoresMeta: [
      {
        store: 'tableShemas',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'title', keypath: 'title', options: { unique: false } },
        ]
      },
      {
        store: 'columns',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'schemaId', keypath: 'schemaId', options: { unique: false } },
          { name: 'label', keypath: 'label', options: { unique: false } },
          { name: 'type', keypath: 'type', options: { unique: false } },
          { name: 'selectOptions', keypath: 'selectOptions', options: { unique: false } },
          { name: 'forbiddenSymbols', keypath: 'forbiddenSymbols', options: { unique: false } },
          { name: 'multySelectMode', keypath: 'multySelectMode', options: { unique: false } },
          { name: 'dateFormat', keypath: 'dateFormat', options: { unique: false } },
          { name: 'isRequired', keypath: 'isRequired', options: { unique: false } },
          { name: 'maxLength', keypath: 'maxLength', options: { unique: false } },
          { name: 'maxItemsSelected', keypath: 'maxItemsSelected', options: { unique: false } },
          { name: 'minValue', keypath: 'minValue', options: { unique: false } },
          { name: 'maxValue', keypath: 'maxValue', options: { unique: false } },
        ]
      },
      {
        store: 'tables',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'title', keypath: 'title', options: { unique: false } },
          { name: 'schemaId', keypath: 'schemaId', options: { unique: false } },
        ]
      },
      {
        store: 'rows',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'tableId', keypath: 'tableId', options: { unique: false } },
        ]
      },
      {
        store: 'cells',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'id', keypath: 'id', options: { unique: true } },
          { name: 'rowId', keypath: 'rowId', options: { unique: false } },
          { name: 'tableId', keypath: 'tableId', options: { unique: false } },
          { name: 'type', keypath: 'type', options: { unique: false } },
          { name: 'value', keypath: 'value', options: { unique: false } },
          { name: 'selectOptions', keypath: 'selectOptions', options: { unique: false } },
          { name: 'forbiddenSymbols', keypath: 'forbiddenSymbols', options: { unique: false } },
          { name: 'multySelectMode', keypath: 'multySelectMode', options: { unique: false } },
          { name: 'dateFormat', keypath: 'dateFormat', options: { unique: false } },
          { name: 'isRequired', keypath: 'isRequired', options: { unique: false } },
          { name: 'maxLength', keypath: 'maxLength', options: { unique: false } },
          { name: 'maxItemsSelected', keypath: 'maxItemsSelected', options: { unique: false } },
          { name: 'minValue', keypath: 'minValue', options: { unique: false } },
          { name: 'maxValue', keypath: 'maxValue', options: { unique: false } },
          { name: 'error', keypath: 'error', options: { unique: false } },
        ]
      },
    ]
  };

