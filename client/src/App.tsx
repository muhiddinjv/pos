import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'antd/dist/antd.min.css';
import Home from './pages/Home';
import Products from './pages/Products';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<Products />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
