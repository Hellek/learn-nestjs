import { useRecoilValue } from 'recoil'

import { api, V1Account } from '@app/api'
import {
  Account,
  currentAccountState,
  oldestAccountState,
} from '@models/accounts'

type BaseRequest = {
  account: V1Account
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

const getAllOperations = async ({
  account,
  oldestAccount,
  cursor,
}: FirstRequest | CursorRequest) => {
  let pageNumber = 0
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

  if (!account.id) {
    throw Error('Отсутствует account id')
  }

  let request: {
    accountId: string
    from?: string
    to?: string
    cursor?: string
  } = {
    accountId: account.id,
    from,
    to,
  }

  while (hasMoreItems) {
    const {
      nextCursor,
      hasNext,
      items,
      // eslint-disable-next-line no-await-in-loop
    } = await api.OperationsService.GetOperationsByCursor({
      limit: 1000,
      ...request,
    }).then(r => r.json())

    if (typeof nextCursor === 'undefined') {
      throw new Error('nextCursor us undefined')
    }

    request = {
      accountId: account.id,
      cursor: nextCursor,
    }

    if (items && items.length > 0) {
      allItems.push(...items)
    }

    hasMoreItems = !!hasNext

    download(JSON.stringify(items, null, 2), `ops-${account.name}-${pageNumber}.json`, 'application/json')
    pageNumber += 1
  }

  return allItems
}

export const Operations = () => {
  const currentAccount = useRecoilValue(currentAccountState)
  const oldestAccount = useRecoilValue(oldestAccountState)

  return (
    <div>
      <button
        type="button"
        disabled={!currentAccount}
        onClick={() => {
          if (!currentAccount) return
          getAllOperations({ account: currentAccount, oldestAccount })
        }}
      >
        Выгрузить операции
      </button>
    </div>
  )
}
