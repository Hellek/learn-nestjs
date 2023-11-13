// import { Accounts } from '@components/Accounts'
// import { Operations } from '@components/Operations'
import { Accounts } from '@components/Accounts'
import { RxPlayground } from '@components/RxPlayground'

export const HomePage = () => (
  <div className="flex flex-col gap-4">
    <RxPlayground />
    <Accounts />
    {/* <Operations /> */}
  </div>
)
