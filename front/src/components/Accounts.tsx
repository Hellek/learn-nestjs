import { useRecoilState, useRecoilValue } from 'recoil'

import {
  currentAccountIdState,
  openedAccountsState,
} from '@models/accounts'

export const Accounts = () => {
  const [currentAccountId, setCurrentAccountId] = useRecoilState(currentAccountIdState)
  const openedAccounts = useRecoilValue(openedAccountsState)

  return (
    <div>
      <select
        value={currentAccountId}
        aria-label="accounts"
        className="w-60"
        onChange={event => setCurrentAccountId(event.target.value)}
      >
        {openedAccounts.map(a => (
          <option key={a.id}>
            {a.name}
          </option>
        ))}
      </select>
    </div>
  )
}
