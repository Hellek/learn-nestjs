import { createEffect, createEvent } from 'effector'

import { api } from '@app/invest-api/apiClient'

export const getAccountsEvent = createEvent('getAccountsEvent')
export const getAccountsFx = createEffect(() => api.fetch('UsersService/GetAccounts').then(r => r.accounts))
