// import { Navigation } from "mdi-material-ui";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/HomePage";
import About from "../pages/About";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TearmsCondition from "../pages/TearmsCondition";
import Contact from "../pages/Contact";
import Product from "../customer/components/products/product/Product";
import ProductDetails from "../customer/components/product/ProductDetails/ProductDetails";
import Cart from "../customer/Components/Product/Cart/Cart";

import DemoAdmin from "../admin/views/DemoAdmin";
import AdminPannel from "../admin/AdminPannel";
import Navigation from "../customer/components/navbar/Navigation";

const Routers = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
        <div>
             <Navigation/>
        </div>
       <div className="">
        <Routes>

        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/home" element={<Homepage/>}></Route>
        <Route path="/about" element={<About/>}></Route>
        <Route path="/privaciy-policy" element={<PrivacyPolicy/>}></Route>
        <Route path="/terms-condition" element={<TearmsCondition/>}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/men" element={<Product/>}></Route>
        <Route path="/product/:productId" element={<ProductDetails/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
      

        {/* <Route path="/admin" element={isAuthenticated && user?.roles.includes('ADMIN') ? <AdminPannel/> : <Navigate to="/login" />} /> */}
        <Route path="/admin" element={<AdminPannel/>}></Route>
        <Route path="/demo" element={<DemoAdmin/>}></Route>

      </Routes>
       </div>
      
    </div>
  );
};

export default Routers;
