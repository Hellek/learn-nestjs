import { createEffect } from 'effector'

import { api } from '@app/invest-api/apiClient'

export const getAccountsFx = createEffect(() => api.fetch('UsersService/GetAccounts').then(r => r.accounts))
