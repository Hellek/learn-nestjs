import {
  createEffect, createEvent, createStore, sample,
} from 'effector'

import { investApi, ResponseType } from '@app/invest-api/apiClient'

// Types
export type Accounts = Required<ResponseType<'UsersService/GetAccounts'>>['accounts']
export type Account = Accounts[0]

// Utils
const LS = {
  currentAccountId: {
    get: () => localStorage.getItem('currentAccountId'),
    set: (id: Required<Account>['id']) => localStorage.setItem('currentAccountId', id),
    // TODO remove item on logout
    remove: () => localStorage.removeItem('currentAccountId'),
  },
}

// Stores
export const $accounts = createStore<Accounts>([])
export const $currentAccountId = createStore<string>(LS.currentAccountId.get() ?? '')

// Derived stores
export const $openedAccounts = $accounts.map(accounts => accounts.filter(a => a.status === 'ACCOUNT_STATUS_OPEN'))
export const $oldestAccount = $accounts.map(accounts => accounts?.sort((a, b) => {
  if (!a.openedDate) return 1
  if (!b.openedDate) return 0

  return (new Date(a.openedDate)).getFullYear() - (new Date(b.openedDate)).getFullYear()
})[0])

// Events
export const getAccountsEvent = createEvent('getAccountsEvent')
export const fetchAccountsFx = createEffect(() => investApi.fetch('UsersService/GetAccounts').then(r => r.accounts))
export const setCurrentAccountIdEvent = createEvent<string>('setCurrentAccountIdEvent')

// Subscriptions
$accounts
  .on(fetchAccountsFx.doneData, (_, accounts) => accounts)

$currentAccountId
  .on(setCurrentAccountIdEvent, (_, id) => {
    LS.currentAccountId.set(id)

    return id
  })

// Don't request accounts if they already fetched
sample({
  clock: getAccountsEvent,
  source: $accounts,
  filter: accounts => !accounts || accounts.length === 0,
  target: fetchAccountsFx,
})

// Initial auto set of currentAccountId
sample({
  clock: $openedAccounts,
  source: $currentAccountId,
  filter: (currentAccountId, openedAccounts) => openedAccounts.length > 0 && currentAccountId.length === 0,
  fn: (currentAccountId, openedAccounts) => openedAccounts[0].id || 'preventCycleWithEmptyId',
  target: setCurrentAccountIdEvent,
})
