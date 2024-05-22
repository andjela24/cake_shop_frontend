import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerRoutes from './routers/CustomerRoutes';
import AdminPannel from './admin/AdminPanel';
import Product from './customer/components/products/product/Product';
import Cake from './customer/components/cakes/cake/Cake'
// import Routers from './Routers/Routers';

function App() {
    return (
        // <div className="">
        //   <Navigation/>
        //   <div>
        //   <HomePage/>
        //   </div>
        // </div>
        <Routes>
            {/* <Route path="/cakes" element={<Product />} /> */}
            <Route path="/admin/*" element={<AdminPannel />} />
            <Route path="/*" element={<CustomerRoutes />} />
        </Routes>
    );
}

export default App;
