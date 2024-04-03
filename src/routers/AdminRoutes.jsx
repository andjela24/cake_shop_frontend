import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminPannel from "../admin/AdminPanel";
import DemoAdmin from "../admin/views/DemoAdmin";

const AdminRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminPannel />}></Route>
        {/* <Route path="/demo" element={<DemoAdmin />}></Route> */}
      </Routes>
    </div>
  );
};

export default AdminRoutes;
