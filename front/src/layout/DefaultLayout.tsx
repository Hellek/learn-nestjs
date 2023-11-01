import { ReactElement } from 'react'

const DefaultLayout = ({ children }: { children: ReactElement}) => (
  <div className="grow bg-gray-800 text-white p-4">
    {children}
  </div>
)

export default DefaultLayout
