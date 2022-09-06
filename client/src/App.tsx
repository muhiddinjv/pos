import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import 'antd/dist/antd.min.css';
import Home from './pages/Home';
import Products from './pages/Products';
import './App.css';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/cart' element={<Cart />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;

export function ProtectedRouter({children}:any){
  if(localStorage.getItem('auth')){
    return children;
  } else {
    return <Navigate to='/login' />
  }
}
