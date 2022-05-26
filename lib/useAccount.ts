import { useState } from 'react'

import Account from 'src/models/Account'
import createAccount from 'lib/createAccount'

import getUpdatedAccount from './getUpdatedAccount'

const initialAccountValue = createAccount()

const useAccount = (): [Account, () => Promise<void>] => {
  const [account, setAccount] = useState<Account>(initialAccountValue)
  const [error, setError] = useState()
  let refreshAccount = async () => {
    try {
      setAccount(await getUpdatedAccount(account))
    } catch (error) {
      setError(error)
    }
  }

  refreshAccount ? (refreshAccount = refreshAccount) : (refreshAccount = error)

  return [account, refreshAccount]
}

export default useAccount
