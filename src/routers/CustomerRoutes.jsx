import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Product from "../customer/components/products/product/Product";
import Contact from "../pages/Contact";
import TearmsCondition from "../pages/TermsCondition";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import About from "../pages/About";
import Homepage from "../pages/HomePage";
import Navigation from "../customer/components/navbar/Navigation";
import Cart from "../customer/components/cart/Cart";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button} from "@mui/material";
import { customTheme, customerTheme } from "../admin/theme/CustomTheme";
import Order from "../customer/components/orders/Order";
import OrderDetails from "../customer/components/orders/OrderDetails";
import Checkout from "../customer/components/checkout/Checkout";
import Footer from "../customer/components/footer/Footer";
import PaymentSuccess from "../customer/components/paymentSuccess/PaymentSuccess";
import RateProduct from "../customer/components/reviewProduct/RateProduct";
import Cake from "../customer/components/cakes/cake/Cake";
import CakeDetails from "../customer/components/cakes/cakeDetails/CakeDetails";
import FlavorGrid from "../customer/components/flavors/FlavorGrid";
import PriceList from "../customer/components/prices/PriceList";
import FAQComponent from "../customer/components/faq/FAQComponent";

const CustomerRoutes = () => {
    const location = useLocation();
    
  
    // Only show Navigation component when not on the NotFound page
    const showNavigation = location.pathname !== "*";

    // const path=["/","/home","/about","/privacy-policy","/terms-condition","/contact","/men",`/product/${productId}`]
  return (
    <div>
    
    <ThemeProvider theme={customerTheme}>
    {showNavigation && <Navigation />}
     <Routes>
     <Route path="/login" element={<Homepage />}></Route>
     <Route path="/register" element={<Homepage />}></Route>
     <Route path="/cakes" element={<Cake />}></Route>
     <Route path="/cakes/:cakeId" element={<CakeDetails />}></Route>



        <Route path="/" element={<Homepage />}></Route>
        <Route path="/home" element={<Homepage />}></Route>
        <Route path="/flavors" element={<FlavorGrid />}></Route>
        <Route path="/prices" element={<PriceList />}></Route>
        <Route path="/questions" element={<FAQComponent />}></Route>

        <Route path="/about" element={<About />}></Route>
        <Route path="/privaciy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/terms-condition" element={<TearmsCondition />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/:lavelOne/:lavelTwo/:lavelThree" element={<Product />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/account/order" element={<Order />}></Route>
        <Route path="/account/order/:orderId" element={<OrderDetails />}></Route>
        <Route path="/account/rate/:productId" element={<RateProduct />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/payments/success" element={<PaymentSuccess />} />
        {/* <Route path="/payment-success" element={<PaymentSuccess />} /> */}
        {/* <Route path="/payment/:orderId" element={<PaymentSuccess />}></Route> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer/>
    </ThemeProvider>
      
    </div>
  );
};

export default CustomerRoutes;
