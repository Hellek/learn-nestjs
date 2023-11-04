import { ReactElement } from 'react'
import { Spin } from 'antd'

const DefaultLayout = ({ loading, children }: { loading: boolean, children: ReactElement }) => (
  <div className="grow bg-gray-800 text-white p-4 flex flex-col">
    {loading ? (
      <div className="grow flex-center">
        <Spin size="large" />
      </div>
    ) : children}
  </div>
)

export default DefaultLayout
