import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomaPage } from './Pages/HomePage/HomaPage'
import { ProductPage } from './Pages/ProductPage/ProductPage'
import { ShoppingCartPage } from './Pages/ShoppingCartPage/ShoppingCartPage'
import { InfoPage, SignUp } from './Pages/SignUpPage/SignUpPage'
import { PaymentPage } from './Pages/PaymentPage/PaymentPage'
import { AdminLogin } from './Pages/AdminLoginPage/AdminLogin'
import { AdminPage } from './Pages/AdminPage/AdminPage'
import { Login } from './Pages/LoginPage/LoginPage'
import { NotFound404 } from './Pages/404/NotFound404'
import { Providers } from './Context/Context'
import { CategoryPage } from './Pages/CategoryPage/CategoryPage'
import { SubCategoryPage } from './Pages/SubCategoryPage/SubCategoryPage'
import { Result } from './Pages/Result/Result'

function App() {

  return (
    <Providers>
      <BrowserRouter>

        <Routes>
          <Route path='/' exact           Component={HomaPage}          />
          <Route path='/category/:id'     Component={CategoryPage}      />
          <Route path='/subcategory/:id'  Component={SubCategoryPage}   />
          <Route path='/Product/:id'      Component={ProductPage}       />
          <Route path='/ShoppingCart'     Component={ShoppingCartPage}  />
          <Route path='/SignUp'           Component={SignUp}            />
          <Route path='/Login'            Component={Login}             />
          <Route path='/Payment/:user'    Component={PaymentPage}       />
          <Route path='/AdminLogin'       Component={AdminLogin}        />
          <Route path='/Admin'            Component={AdminPage}         />
          <Route path='/Result/:result'   Component={Result}            />
          <Route path='*'                 Component={NotFound404}       />
        </Routes>
        
      </BrowserRouter>
    </Providers>
  )
}

export default App
