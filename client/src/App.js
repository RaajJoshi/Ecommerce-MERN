import './App.css';
import Header from "./component/Header.js";
import Footer from "./component/Footer.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from './Pages/About.js';
import Home from './Pages/Home';
import RegisterF from './Pages/RegisterF';
import ProductDetails from './Product/ProductDetails';
import Search from './Product/Search';
import LoginC from './Pages/LoginC';
import Profile from './Customer/Profile';
import React from 'react';
import UpdatePasswd from './Customer/UpdatePasswd';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import Payment from './component/Cart/Payment';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './Order/MyOrders';
import OrderDetails from './Order/OrderDetails';
import Dashboard from './component/admin/Dashboard';
import ProductList from './component/admin/ProductList';
import NewProduct from './component/Farmer/NewProduct';
import UpdateProduct from './component/Farmer/updateProduct';
import OrderList from './component/admin/orderList';
import ProcessOrder from './component/admin/processOrder';
import FarmerList from './component/admin/farmerList';
import CustomersList from './component/admin/customerList';
import ProductsList from './Product/productsList';
import MyProducts from './component/Farmer/myProducts';
import FarmProfile from './component/Farmer/FarmProfile';
import FarmUpdtPasswd from './component/Farmer/FarmUpdtPasswd';
import UpdtProf from './component/admin/updtProf';
import UptdPass from './component/admin/updtPass';
import LogoutA from './Pages/LogoutA';
// import { initialState, reducer } from './component/UseReducer';
// import { createContext, useReducer } from 'react';
// export const UserContext = createContext();

function App() {

  //const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {/*<UserContext.Provider value={{ state, dispatch }}>*/}
      <Router>
        <Header />
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route extact path="/about" element={<About />} />
          <Route extact path="/register" element={<RegisterF />} />
          <Route extact path="/login" element={<LoginC />} />
          <Route extact path="/myProducts" element={<MyProducts />} />
          <Route extact path="/myProducts/product/:id" element={<UpdateProduct />} />
          <Route extact path="/product/create" element={<NewProduct />} />
          <Route extact path="/farmProfile" element={<FarmProfile />} />
          <Route extact path="/farmProfile/updatePasswd" element={<FarmUpdtPasswd />} />
          <Route extact path="/profile" element={<Profile />} />
          <Route extact path="/profile/updatePasswd" element={<UpdatePasswd />} />
          <Route extact path="/product/:id" element={<ProductDetails />} />
          <Route extact path="/products" element={<ProductsList />} />
          <Route extact path="/products/:keyword" element={<ProductsList />} />
          <Route extact path="/search" element={<Search />} />
          <Route extact path="/cart" element={<Cart />} />
          <Route extact path="/login/shipping" element={<Shipping />} />
          <Route extact path="/process/payment" element={<Payment />} />
          <Route extact path="/success" element={<OrderSuccess />} />
          <Route extact path="/order/confirm" element={<ConfirmOrder />} />
          <Route extact path="/orders" element={<MyOrders />} />
          <Route extact path="/order/:id" element={<OrderDetails />} />
          <Route extact path="/logout" element={<LogoutA />} />
          <Route extact path="/dashboard" element={<Dashboard />} />
          <Route extact path='/admin/products' element={<ProductList />} />
          <Route extact path="/admnProfile" element={<UpdtProf />} />
          <Route extact path="/admnProfile/updatePasswd" element={<UptdPass />} />
          <Route extact path="/admin/orders" element={<OrderList />} />
          <Route extact path="/admin/order/:id" element={<ProcessOrder />} />
          <Route extact path="/admin/farmers" element={<FarmerList />} />
          <Route extact path="/admin/customers" element={<CustomersList />} />
        </Routes>
        <Footer />
      </Router>
      {/*</UserContext.Provider>*/}
    </>
  );
}

export default App;
