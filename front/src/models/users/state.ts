import { createStore } from 'effector'

import { ResponseType } from '@app/invest-api/apiClient'

export type Accounts = ResponseType<'UsersService/GetAccounts'>['accounts']

export const $accounts = createStore<Accounts>([])
