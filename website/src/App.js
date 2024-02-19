import React, { useReducer} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { initialState, reducer } from "./components/UseReducer";
import { Provider } from "react-redux";
import store from './redux/store/store.js';
import UserReg from "./common/User/UserReg";
import Edit from "./common/User/Edit";
import { FetchData } from "./common/User/FetchData";
import Admin from "./common/Admin/AdminReg";
import AdminLogAuth from "./common/Admin/AdminLog";
import Products from "./Product/Products";
import Product from "./Product/Product";
import Cart from "./Product/Cart";
import Login from "./common/Login";
import Order from "./orderpage/Order";
import { OrderDetails } from "./orderpage/OrderDetails";
import Detail from "./orderpage/Detail";
import { OrderDe } from "./orderpage/OrderDe";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminDashBoard from "./common/Admin/AdminDashBoard";
import Register from "./common/Register";
import LoginCom from "./common/Logincom";
import DashBoard from "./pages/Dashboard";
import { Productadmin } from "./Product/Productadmin";
import DashboardUser from "./common/User/DashboardUser";
import ProductStore from "./Product/ProductStore";
import ProductsData from "./Product/ProductsData";
import Productdata from "./Product/Productdata";
import Header from "./pages/Header.js";

export const UserContext = React.createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <Provider store={store}>
        <UserContext.Provider value={{ state, dispatch }}>
          <BrowserRouter>
            
            <Routes>
            <Route path="/" element={<Landing/>} /> 
          <Route path="/userreg" element={<UserReg/>} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/userdetails" element={<FetchData/>} />
          {/* <Route path="/userlog" element={<UserLogingAuth/>} /> */}
          <Route path="/adminreg" element={<Admin/>} />
          <Route path="/adminlog" element={<AdminLogAuth/>} />
          <Route path="/admindashboard" element={<AdminDashBoard/>} />

          <Route path="/productstore" element={<ProductStore/>} />
          <Route path="/productdata" element={<ProductsData/>} />
          <Route path="/productsdata/:id" element={<Productdata/>} />
          <Route path="/products" element={<Products/>} />
          <Route path='/Product/:id' element={<Product/>} /> 
          <Route path="/cart" element={<Cart/>}/>
          {/* <Route path="/data" element={<DataDisplayPage user={user}/>}/> */}
        
          <Route path="/loginc" element={<Login/>} />
          <Route path="/order/:id" element={<Order/>} />
          <Route path="/orderdetails" element={<OrderDetails/>} />
          <Route path="/details" element={<Detail/>} />
          {/* <Route path="/payment" element={<Payment/>}/> */}
         
          <Route path="/Home" element={<Home/>} />  
          <Route path="/order" element={<OrderDe/>} />  
          <Route path="/footer" element={<Footer/>} /> 
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>

          <Route path='*' element={<div>Page Not Found!</div>}/>
       
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<LoginCom/>}/>
          <Route path='/userdetail' element={<DashboardUser/>}/>

          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/productadmin' element={<Productadmin/>}/>
          <Route path='/header' element={<Header/>}/>
            </Routes>
          </BrowserRouter>
          <Footer />
        </UserContext.Provider>
      </Provider>
    </>
  );
};

export default App;
