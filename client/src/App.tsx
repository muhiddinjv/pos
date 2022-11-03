import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import Home from './pages/Home';
import Products from './pages/Products';
import './App.css';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Bills from './pages/Bills';
import Customers from './pages/Customers';
import Admin from './pages/Admin';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
          }/>
          <Route path='/products' element={
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
          }/>
          <Route path='/customers' element={<Customers />}/>
          <Route path='/admin' element={
              <ProtectedRouter>
                <Admin />
              </ProtectedRouter>
          }/>
          <Route path='/cart' element={
            <ProtectedRouter>
              <Cart />
            </ProtectedRouter>
          }/>
          <Route path='/bills' element={
            <ProtectedRouter>
              <Bills />
            </ProtectedRouter>
          }/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

export function ProtectedRouter({children}:any){
  if(localStorage.getItem('usertoken')){
    return children;
  } else {
    return <Navigate to='/login' />
  }
}
