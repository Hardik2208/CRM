import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Product from "./pages/Product";
import Settings from "./pages/Settings";
import Enquiry from "./pages/Enquiry";
import Staff from "./pages/Staff";
import Invoice from "./pages/Invoice";
import Order from "./pages/Order"
import Sales from "./pages/Sales"
import Customer from "./pages/Customer";
import ThirdPartyF from "./pages/ThirdPartyF";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
       <div className="flex">
       <Sidebar />
       <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Product" element={<Product />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Enquiry" element={<Enquiry />} />
            <Route path="/Staff" element={<Staff />} />
            <Route path="/Invoice" element={<Invoice />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Sales" element={<Sales />} />
            <Route path="/Customer" element={<Customer />} />
            <Route path="/ThirdPartyF" element={<ThirdPartyF />} />
          </Routes>
        </main>
       </div>
      </div>
    </Router>
  );
}

export default App;
