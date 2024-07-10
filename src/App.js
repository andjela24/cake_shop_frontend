import { Route, Routes } from "react-router-dom";
import "./App.css";
import CustomerRoutes from "./routers/CustomerRoutes";
import AdminPannel from "./admin/AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminPannel />} />
      <Route path="/*" element={<CustomerRoutes />} />
    </Routes>
  );
}

export default App;
