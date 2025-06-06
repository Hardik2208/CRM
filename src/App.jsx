import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Settings from "./pages/Settings";
import Enquiry from "./pages/Enquiry";
import Staff from "./pages/Staff";
import Invoice from "./pages/Invoice";
import Order from "./pages/Order"
import Sales from "./pages/Sales"
import Customer from "./pages/Customer";
import ThirdPartyF from "./pages/ThirdPartyF";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import UpdatePassword from "./pages/UpdatePassword";


function App() {
  return (
    <Router>
     
       <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Enquiry" element={<Enquiry />} />
            <Route path="/Staff" element={<Staff />} />
            <Route path="/Invoice" element={<Invoice />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Sales" element={<Sales />} />
            <Route path="/Customer" element={<Customer />} />
            <Route path="/ThirdPartyF" element={<ThirdPartyF />} />
            <Route path="/PasswordReset" element={<PasswordReset />} />
            <Route path="/UpdatePassword" element={<UpdatePassword />} />

          </Routes>
        </main>
       
    </Router>
  );
}

export default App;
