
import './App.css';
import Register from './features/user/register';
import Login from './features/user/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './cpmponents/layout';
import Home from './components/Home';
import AllProduct from './features/product/allProduct';
import CaeateProduct from "./features/product/CreateProduct"
import UpdateProduct from "./features/product/updateProduct"
import DeleteProduct from "./features/product/deleteProduct"
import ProductById from './features/product/productById';
import GetBasket from './features/basket/getBasket';
import AdminProducts from './features/product/adminProducts';
import NotFound from './cpmponents/NotFound';
import RequireAuth from './cpmponents/RequireAuth';
import RequireAdmin from './cpmponents/RequireAdmin';

function App() {
  return (
    <div className="App">


      <Router>
        <Routes>

          <Route path='/' element={<Layout></Layout>}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/allProduct" element={<AllProduct />} />
            <Route path="/adProduct" element={<CaeateProduct />} />
            <Route path="/updateProduct" element={<UpdateProduct />} />
            <Route path="/deleteProduct" element={<DeleteProduct />} />
            <Route path="/productById" element={<ProductById />} />
            <Route path="/adminproduct" element={
              <RequireAdmin>
                <AdminProducts />
              </RequireAdmin>
            } />

            <Route path='/allProduct/basket' element={
              <RequireAuth>
                <GetBasket />
              </RequireAuth>
            } />
            
            {/* 404 - Catch all unmatched routes */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
