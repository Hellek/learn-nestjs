import { Accounts } from '@components/Accounts'
import { Operations } from '@components/Operations'

export const HomePage = () => (
  <div className="flex flex-col gap-4">
    <Accounts />
    <Operations />
  </div>
)
