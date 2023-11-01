import { useEffect } from 'react'
import { Spin } from 'antd'
import { useEvent, useStore } from 'effector-react'

import { Accounts } from '@components/Accounts'

import { getAccountsEvent, getAccountsFx } from '@models/users'

export const HomePage = () => {
  const getAccounts = useEvent(getAccountsEvent)
  const getAccountsPending = useStore(getAccountsFx.pending)

  useEffect(() => {
    getAccounts()
  }, [getAccounts])

  if (getAccountsPending) {
    return (
      <div className="grow flex-center">
        <Spin size="large" />
      </div>
    )
  }

  return (
    <div>
      <Accounts />
    </div>
  )
}
