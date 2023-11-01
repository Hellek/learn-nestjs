import { BrowserRouter, useRoutes } from 'react-router-dom'
import { useGate } from 'effector-react'

import { publicRoutes } from '@app/routes'
import { AppTheme } from '@app/theme'
import { AppGate } from '@models/app'
import DefaultLayout from './DefaultLayout'

const PublicRoute = () => useRoutes(Object.values(publicRoutes))

const App = () => {
  useGate(AppGate)

  return (
    <AppTheme>
      <BrowserRouter>
        <DefaultLayout>
          <PublicRoute />
        </DefaultLayout>
      </BrowserRouter>
    </AppTheme>
  )
}

export default App
