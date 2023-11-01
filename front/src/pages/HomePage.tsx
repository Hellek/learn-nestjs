import { useEffect } from 'react'
import { useEvent } from 'effector-react'

import { Accounts } from '@components/Accounts'

import { getAccountsFx } from '@models/users'

export const HomePage = () => {
  const getAccounts = useEvent(getAccountsFx)

  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  return (
    <div>
      <Accounts />
    </div>
  )
}
