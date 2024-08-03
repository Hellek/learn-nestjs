import { BrowserRouter, useRoutes } from 'react-router-dom'
import { useGate, useStore } from 'effector-react'

import { publicRoutes } from '@app/routes'
import { $isInitialsLoaded, AppGate } from '@models/app/initials'
import DefaultLayout from './DefaultLayout'

const PublicRoute = () => useRoutes(Object.values(publicRoutes))

const App = () => {
  useGate(AppGate)

  const isInitialsLoaded = useStore($isInitialsLoaded)

  return (
    <BrowserRouter>
      <DefaultLayout loading={!isInitialsLoaded}>
        <PublicRoute />
      </DefaultLayout>
    </BrowserRouter>
  )
}

export default App
