import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {RestaurantProvider} from './context/RestaurantProvider'
import {CategoriesProvider} from './context/CategoriesProvider'
import {ProductsProvider} from './context/ProductsProvider'
import {TableProvider} from './context/TableProvider'
import {OrdersProvider} from './context/OrdersProvider'
import HomeLayout from './layouts/HomeLayout'
import LoginLayout from './layouts/LoginLayout'
import Login from './views/login_register/Login'
import Dashboard from './views/afterLogin/Dashboard'
import Category from './views/afterLogin/Category'
import Products from './views/afterLogin/Products'
import Tables from './views/afterLogin/Tables'
import Orders from './views/afterLogin/Orders'
import Sales from './views/afterLogin/Sales'
import Stadistics from './views/afterLogin/Stadistics'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import globalEN from './translation/en/global.json'
i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      global: globalEN
    }
  }
})
function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18next}>
        <RestaurantProvider>
          <CategoriesProvider>
            <ProductsProvider>
              <TableProvider>
                <OrdersProvider>
                  <Routes>
                    <Route path='/' element={<HomeLayout />} >
                      {/*<Route index element={<Home />} />*/}
                      {/*<Route path='login' element={<Login />} />*/}
                      <Route index element={<Login />} />
                    </Route>
                    <Route path='/dashboard' element={<LoginLayout />} >
                        <Route index element={<Dashboard />} />
                        <Route path='category' element={<Category />} />
                        <Route path='products' element={<Products />} />
                        <Route path='tables' element={<Tables />} />
                        <Route path='orders' element={<Orders />} />
                        <Route path='sales' element={<Sales />} />
                        <Route path='stadistics' element={<Stadistics />} />
                      </Route>
                  </Routes>
                </OrdersProvider>
              </TableProvider>
            </ProductsProvider>
          </CategoriesProvider>
        </RestaurantProvider>
      </I18nextProvider>
    </BrowserRouter>
  )
}
export default App
