import { Select } from 'antd'
import { useEvent, useStore } from 'effector-react'

import { $accounts, $currentAccountId, setCurrentAccountIdEvent } from '@models/users'

export const Accounts = () => {
  const accounts = useStore($accounts)
  const currentAccountId = useStore($currentAccountId)
  const setCurrentAccountId = useEvent(setCurrentAccountIdEvent)

  const openedAccounts = accounts?.filter(a => a.status === 'ACCOUNT_STATUS_OPEN')
  const options = openedAccounts?.map(a => ({ value: a.id, label: a.name }))

  return (
    <div>
      <Select
        value={currentAccountId}
        className="w-60"
        options={options}
        onChange={setCurrentAccountId}
      />
    </div>
  )
}
