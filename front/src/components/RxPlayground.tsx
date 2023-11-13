import { useEffect } from 'react'

import { tinkoffDb } from './tinkoff.db'

export const RxPlayground = () => {
  useEffect(() => {
    const init = async () => {
      const myDocument2 = await tinkoffDb.operations.insert({
        id: 'todo1',
        name: 'Learn RxDB',
        done: false,
        timestamp: new Date().toISOString(),
      })
    }

    init()
  }, [])

  return (
    <div>
      RxPlayground
    </div>
  )
}
