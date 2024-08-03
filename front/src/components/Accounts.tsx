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
      <select
        value={currentAccountId}
        aria-label="accounts"
        className="w-60"
        onChange={event => setCurrentAccountId(event.target.value)}
      >
        {options.map(({ label, value }) => (
          <option key={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
