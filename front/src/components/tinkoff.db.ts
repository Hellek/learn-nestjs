import { addRxPlugin, createRxDatabase } from 'rxdb'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'

if (process.env.NODE_ENV === 'development') {
  addRxPlugin(RxDBDevModePlugin)
}

const initTinkoffDatabase = async () => {
  const database = await createRxDatabase({
    name: 'tinkoff',
    storage: getRxStorageDexie(),
  })

  const operationsSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
      id: {
        type: 'string',
        maxLength: 100, // <- the primary key must have set maxLength
      },
      name: {
        type: 'string',
      },
      done: {
        type: 'boolean',
      },
      timestamp: {
        type: 'date-time',
      },
    },
    required: ['id', 'name', 'done', 'timestamp'],
  }

  await database.addCollections({
    operations: {
      schema: operationsSchema,
    },
  })

  return database
}

const tinkoffDb = initTinkoffDatabase()

export {
  tinkoffDb,
}
