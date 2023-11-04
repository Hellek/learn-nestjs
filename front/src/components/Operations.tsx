import { useState } from 'react'
import { Button } from 'antd'
import { useStore } from 'effector-react'

import { investApi } from '@app/invest-api/apiClient'
import {
  $currentAccountId, $oldestAccount, Account,
} from '@models/users/accounts'

type BaseRequest = {
  accountId: string
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
  cursor,
}: FirstRequest | CursorRequest) => {
  let hasMoreItems = true
  const allItems = []
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
      allItems.push(...items)
    }

    hasMoreItems = !!hasNext
  }

  return allItems
}

export const Operations = () => {
  const [isExporting, setIsExporting] = useState(false)
  const currentAccountId = useStore($currentAccountId)
  const oldestAccount = useStore($oldestAccount)

  return (
    <div>
      <Button
        onClick={() => {
          setIsExporting(true)

          getOperations({ accountId: currentAccountId, oldestAccount }).then(all => {
            download(JSON.stringify(all), 'all-operations.json', 'application/json')
          }).finally(() => {
            setIsExporting(false)
          })
        }}
        loading={isExporting}
      >
        Выгрузить операции
      </Button>
    </div>
  )
}
