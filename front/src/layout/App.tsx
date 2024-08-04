import { BrowserRouter, useRoutes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import { publicRoutes } from '@app/routes'
import { useGetInitials } from '@models/initials'
import DefaultLayout from './DefaultLayout'

const PublicRoute = () => useRoutes(Object.values(publicRoutes))

const RecoiledApp = () => {
  const isInitialsLoaded = useGetInitials()

  return (
    <BrowserRouter>
      <DefaultLayout loading={!isInitialsLoaded}>
        <PublicRoute />
      </DefaultLayout>
    </BrowserRouter>
  )
}

export const App = () => (
  <RecoilRoot>
    <RecoiledApp />
  </RecoilRoot>
)
