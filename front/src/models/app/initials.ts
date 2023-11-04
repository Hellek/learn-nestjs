import { combine, sample } from 'effector'
import { createGate } from 'effector-react'

import { $accounts, getAccountsEvent } from '@models/users/accounts'

// Gates
export const AppGate = createGate()

// Derived stores
export const $isInitialsLoaded = combine(
  $accounts,
  accounts => accounts && accounts.length > 0,
)

// Subscriptions
sample({
  clock: AppGate.open,
  target: getAccountsEvent,
})
