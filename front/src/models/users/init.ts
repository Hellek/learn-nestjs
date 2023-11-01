import { getAccountsFx } from './events'
import { $accounts } from './state'

$accounts
  .on(getAccountsFx.doneData, (_, accounts) => accounts)
