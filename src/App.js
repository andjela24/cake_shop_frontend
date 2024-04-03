import { Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerRoutes from './routers/CustomerRoutes';
import AdminPannel from './admin/AdminPanel';
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
            <Route path="/*" element={<CustomerRoutes />} />
            <Route path="/admin/*" element={<AdminPannel />} />
        </Routes>
    );
}

export default App;
