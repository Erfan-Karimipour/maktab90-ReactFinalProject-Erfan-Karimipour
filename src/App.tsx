import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomaPage } from './layout/HomePage/HomaPage'
import { ProductGroupPage } from './layout/ProductGroupPage/ProductGroupPage'
import { ProductPage } from './layout/ProductPage/ProductPage'
import { ShoppingCartPage } from './layout/ShoppingCartPage/ShoppingCartPage'
import { InfoPage } from './layout/InfoPage/InfoPage'
import { PaymentPage } from './layout/PaymentPage/PaymentPage'
import { AdminLogin } from './layout/AdminLoginPage/AdminLogin'
import { AdminPage } from './layout/AdminPage/AdminPage'
import { Login } from './layout/Login/Login'
import { Providers } from './assets/Context/Context'

function App() {

  return (
    <Providers>
      <BrowserRouter>

        <Routes>
          <Route path='/' exact         Component={HomaPage}          />
          <Route path='/ProductGroup'   Component={ProductGroupPage}  />
          <Route path='/Product/'       Component={ProductPage}       />
          <Route path='/ShoppingCart'   Component={ShoppingCartPage}  />
          <Route path='/Info'           Component={InfoPage}          />
          <Route path='/Payment'        Component={PaymentPage}       />
          <Route path='/Login'          Component={Login}             />
          <Route path='/AdminLogin'     Component={AdminLogin}        />
          <Route path='/Admin'          Component={AdminPage}         />
        </Routes>

      </BrowserRouter>
    </Providers>
  )
}

export default App
