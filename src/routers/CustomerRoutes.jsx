import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Homepage from "../customer/pages/HomePage";
import About from "../customer/pages/About";
import Navigation from "../customer/components/navbar/Navigation";
import Cart from "../customer/components/cart/Cart";
import { ThemeProvider } from "@mui/material/styles";
import { customerTheme } from "../admin/theme/CustomTheme";
import Order from "../customer/components/orders/Order";
import OrderDetails from "../customer/components/orders/OrderDetails";
import Checkout from "../customer/components/checkout/Checkout";
import Footer from "../customer/components/footer/Footer";
import PaymentSuccess from "../customer/components/paymentSuccess/PaymentSuccess";
import Cake from "../customer/components/cakes/cake/Cake";
import CakeDetails from "../customer/components/cakes/cakeDetails/CakeDetails";
import FlavorGrid from "../customer/components/flavors/FlavorGrid";
import PriceList from "../customer/components/prices/PriceList";
import FAQComponent from "../customer/components/faq/FAQComponent";

const CustomerRoutes = () => {
  const location = useLocation();
  const showNavigation = location.pathname !== "*";

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
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/account/order" element={<Order />}></Route>
          <Route
            path="/account/order/:orderId"
            element={<OrderDetails />}
          ></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/payments/success" element={<PaymentSuccess />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default CustomerRoutes;
