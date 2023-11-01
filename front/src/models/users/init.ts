import { sample } from 'effector'

import { getAccountsEvent, getAccountsFx, setCurrentAccountIdEvent } from './events'
import { $accounts, $currentAccountId } from './state'

$accounts
  .on(getAccountsFx.doneData, (_, accounts) => accounts)

$currentAccountId
  .on(setCurrentAccountIdEvent, (_, id) => id)

// Don't request accounts if they already fetched
sample({
  clock: getAccountsEvent,
  source: $accounts,
  filter: accounts => !accounts || accounts.length === 0,
  target: getAccountsFx,
})

$currentAccountId.watch(id => {
  localStorage.setItem('currentAccountId', id)
})
