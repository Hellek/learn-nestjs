import { Select } from 'antd'
import { useEvent, useStore } from 'effector-react'

import {
  $currentAccountId, $openedAccounts, setCurrentAccountIdEvent,
} from '@models/users/accounts'

export const Accounts = () => {
  const openedAccounts = useStore($openedAccounts)
  const currentAccountId = useStore($currentAccountId)
  const setCurrentAccountId = useEvent(setCurrentAccountIdEvent)
  const options = openedAccounts.map(a => ({ value: a.id, label: a.name }))

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
