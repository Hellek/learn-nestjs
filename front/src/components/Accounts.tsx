import { useStore } from 'effector-react'

import { $accounts } from '@models/users'

export const Accounts = () => {
  const accounts = useStore($accounts)

  return (
    <pre>{JSON.stringify(accounts, null, '\t')}</pre>
  )
}
