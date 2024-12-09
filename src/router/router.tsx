import HomeLayout from '@/app/home/layout/layout'
import HomePage from '@/app/home/pages/home-page/home-page'
import RootLayout from '@/layout/layout'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router'
HomePage

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route element={<HomeLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
