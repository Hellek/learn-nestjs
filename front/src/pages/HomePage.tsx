import { useEffect } from 'react'
import { useEvent } from 'effector-react'

import { Accounts } from '@components/Accounts'

import { getAccountsEvent } from '@models/users'

export const HomePage = () => {
  const getAccounts = useEvent(getAccountsEvent)

  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  return (
    <div>
      <Accounts />
    </div>
  )
}
