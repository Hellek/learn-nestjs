import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { useStore } from 'effector-react'

import { commonApi } from '@app/common-api/apiClient'
import { investApi } from '@app/invest-api/apiClient'
import {
  $currentAccountId, $oldestAccount, Account,
} from '@models/users/accounts'

type BaseRequest = {
  accountId: string
  partialSave(operations: unknown[]): void
}

type FirstRequest = BaseRequest & {
  oldestAccount: Account
  cursor?: string
}

type CursorRequest = BaseRequest & {
  oldestAccount?: Account
  cursor: string
}

function download(content: string, fileName: string, contentType: string) {
  const a = document.createElement('a')
  const file = new Blob([content], { type: contentType })
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}

const getOperations = async ({
  accountId,
  oldestAccount,
  partialSave,
  cursor,
}: FirstRequest | CursorRequest) => {
  let hasMoreItems = true
  // const allItems = []
  const oldestAccountOpenedDate = oldestAccount?.openedDate || ''
  const nextFullYear = (new Date().getFullYear() + 1)
  const nextFullYearISO = (new Date(`${nextFullYear}`)).toISOString()

  if (!cursor && oldestAccountOpenedDate === '') {
    throw Error('This is initial request but oldestAccountOpenedDate is empty')
  }

  const from = oldestAccountOpenedDate
  const to = nextFullYearISO

  let request: {
    accountId: string
    from?: string
    to?: string
    cursor?: string
  } = {
    accountId,
    from,
    to,
  }

  while (hasMoreItems) {
    const {
      nextCursor,
      hasNext,
      items,
      // eslint-disable-next-line no-await-in-loop
    } = await investApi.fetch('OperationsService/GetOperationsByCursor', {
      limit: 1000,
      ...request,
    })

    if (typeof nextCursor === 'undefined') {
      throw new Error('nextCursor us undefined')
    }

    request = {
      accountId,
      cursor: nextCursor,
    }

    if (items && items.length > 0) {
      partialSave(items)
      // allItems.push(...items)
    }

    hasMoreItems = !!hasNext
  }

  // return allItems
}

export const Operations = () => {
  const [isExporting, setIsExporting] = useState(false)
  const currentAccountId = useStore($currentAccountId)
  const oldestAccount = useStore($oldestAccount)

  useEffect(() => {
    commonApi.fetch('operations', {
      method: 'get',
    })
      .then(res => { console.log('get', res) })
  }, [])

  return (
    <div>
      <Button
        onClick={async () => {
          setIsExporting(true)

          const partialSave = (operations: unknown[]) => {
            commonApi.fetch('operations', {
              method: 'post',
              body: JSON.stringify(operations),
              headers: {
                'Content-Type': 'application/json',
              },
            })
          }

          try {
            // partialSave([new Date().toISOString()])
            await getOperations({ accountId: currentAccountId, oldestAccount, partialSave })
            // download(JSON.stringify(all), 'all-operations.json', 'application/json')
          } finally {
            setIsExporting(false)
          }
        }}
        loading={isExporting}
      >
        Выгрузить операции
      </Button>
    </div>
  )
}
