import { atom, selector } from 'recoil'

import { investApi, ResponseType } from '@app/invest-api/apiClient'

export type Accounts = Required<ResponseType<'UsersService/GetAccounts'>>['accounts']
export type Account = Accounts[0]

export const fetchAccounts = investApi.fetch('UsersService/GetAccounts').then(r => r.accounts)

export const accountsState = atom<Accounts>({
  key: 'accountsState',
  default: [],
})

export const currentAccountIdState = atom<string>({
  key: 'currentAccountIdState',
  default: '',
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
