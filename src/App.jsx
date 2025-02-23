import Navbar from './components/Navbar'
import Footer from './components/Footer'

/* PAGES */
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Cart from './pages/Cart'
import Pizza from './pages/Pizza'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'

/* COMPONENTES Routes & Route */
import { Navigate, Route, Routes } from 'react-router-dom'
import CartProvider from './context/CartContext'
import UserProvider, { UserContext } from './context/UserContext'
import { useContext } from 'react'

function App() {
  /* ****** UserContext ****** */
  const {token} = useContext(UserContext)
  const {isAuthenticated} = useContext(UserContext)
  return (
    <section className="layout">
      {/* SIEMPRE SE MOSTRARAN LOS COMPONENTES NAVBAR & FOOTER */}
      
          {/* *** Navbar *** */}
          <Navbar />
          {/* RUTAS */}
          <Routes>
            {/* *** Home *** */}
            <Route path='/' element={<Home />} />
            {/* *** RegisterPage *** */}
            <Route path='/register' element={!isAuthenticated ? <RegisterPage /> : <Navigate to='/' />} />
            {/* *** LoginPage *** */}
            {/* <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to='/' />} /> */}
            <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to='/profile' />} />
            {/* *** Cart *** */}
            <Route path='/cart' element={<Cart />} />
            {/* *** Pizza *** */}
            <Route path='/pizza/:id' element={<Pizza />} />
            {/* *** ProfilePage *** */}
            <Route path='/profile' element={isAuthenticated ? <ProfilePage /> : <Navigate to='/login' />} />
            {/* *** NotFound *** */}
            {/* <Route path='/404' element={<NotFound />} /> */}
            {/* El componente Navigate permite redireccionar una ruta */}
            {/* <Route path='*' element={<Navigate to="/404" />} /> */}
            <Route path='*' />
          </Routes>
      {/* *** Footer *** */}
      <Footer />      
    </section>
  )
}

export default App
