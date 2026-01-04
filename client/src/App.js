
import './App.css';
import Register from './features/user/register';
import Login from './features/user/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './cpmponents/layout';
import AllProduct from './features/product/allProduct';
import CaeateProduct from "./features/product/CreateProduct"
import UpdetProduct from "./features/product/updetProduct"
import DeletProduct from "./features/product/deletProduct"
import ProductById from './features/product/productById';
import GetBasket from './features/basket/getBasket';
import AdminProducts from './features/product/adminProducts';
function App() {
  return (
    <div className="App">


      <Router>
        <Routes>

          <Route path='/' element={<Layout></Layout>}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/allProduct" element={<AllProduct />} />
            <Route path="/adProduct" element={<CaeateProduct />} />
            <Route path="/updetProduct" element={<UpdetProduct />} />
            <Route path="/deleteProduct" element={<DeletProduct />} />
            <Route path="/productById" element={<ProductById />} />
            <Route path="/adminproduct" element={<AdminProducts />} />

            <Route path='/allProduct/basket' element={<GetBasket></GetBasket>}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
