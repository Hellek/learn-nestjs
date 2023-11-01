import { sample } from 'effector'

import { getAccountsEvent, getAccountsFx } from './events'
import { $accounts } from './state'

$accounts
  .on(getAccountsFx.doneData, (_, accounts) => accounts)

// Don't request accounts if they already fetched
sample({
  clock: getAccountsEvent,
  source: $accounts,
  filter: accounts => !accounts || accounts.length === 0,
  target: getAccountsFx,
})
