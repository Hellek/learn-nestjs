import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { accountsState, currentAccountState, fetchAccounts } from '@models/accounts'

export const useGetInitials = () => {
  const [accounts, setAccounts] = useRecoilState(accountsState)
  const [currentAccount, setCurrentAccount] = useRecoilState(currentAccountState)

  useEffect(() => {
    fetchAccounts.then(accs => {
      if (accs) {
        setAccounts(accs)
        if (!currentAccount) setCurrentAccount(accs[0])
      }
    })
  }, [currentAccount, setAccounts, setCurrentAccount])

  const hasAccounts = accounts.length > 0

  return hasAccounts
}
