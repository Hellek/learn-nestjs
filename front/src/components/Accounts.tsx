import { useRecoilState, useRecoilValue } from 'recoil'

import {
  currentAccountState,
  openedAccountsState,
} from '@models/accounts'

export const Accounts = () => {
  const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)
  const openedAccounts = useRecoilValue(openedAccountsState)

  return (
    <div>
      <select
        value={currentAccount ? currentAccount.id : undefined}
        aria-label="accounts"
        className="w-60"
        onChange={event => {
          const selectedAccount = openedAccounts.find(({ id }) => id === event.target.value)
          if (selectedAccount) setCurrentAccount(selectedAccount)
        }}
      >
        {openedAccounts.map(a => (
          <option key={a.id} value={a.id}>
            {a.name}
          </option>
        ))}
      </select>
    </div>
  )
}
