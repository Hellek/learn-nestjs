import { atom, selector } from 'recoil'

import { api, V1Account } from '@app/api'

export type Accounts = V1Account[]
export type Account = V1Account

export const fetchAccounts = api.UsersService.GetAccounts({})
  .then(res => res.json())
  .then(({ accounts }) => accounts)

export const accountsState = atom<Accounts>({
  key: 'accountsState',
  default: [],
})

export const currentAccountState = atom<V1Account | null>({
  key: 'currentAccountState',
  default: null,
})

export const openedAccountsState = selector({
  key: 'openedAccountsState',
  get: ({ get }) => {
    const accounts = get(accountsState)

    return accounts.filter(a => a.status === 'ACCOUNT_STATUS_OPEN')
  },
})

export const oldestAccountState = selector({
  key: 'oldestAccountState',
  get: ({ get }) => {
    const accounts = [...get(accountsState)]

    const sortedAccounts = accounts.sort((a, b) => {
      if (!a.openedDate) return 1
      if (!b.openedDate) return 0

      return (new Date(a.openedDate)).getTime() - (new Date(b.openedDate)).getTime()
    })

    return sortedAccounts[0]
  },
})
