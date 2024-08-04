import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { accountsState, fetchAccounts } from '@models/accounts'

export const useGetInitials = () => {
  const [accounts, setAccounts] = useRecoilState(accountsState)

  useEffect(() => {
    fetchAccounts.then(a => {
      if (a) {
        setAccounts(a)
      }
    })
  }, [setAccounts])

  const hasAccounts = accounts.length > 0

  return hasAccounts
}
