import React from "react";
import logo from "../src/assets/images/logo1.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Merchant from "./components/Merchant";
import SuccessPage from "./components/SuccessPage";

export default function App() {
  return (
    <div className="flex my-[8rem]">
      <div className="w-[50%]">
        <Router>
          <Routes>
            <Route path="/" element={<RegisterUser />} />
            <Route path="/merchant" element={<Merchant />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </Router>
      </div>
      <div className="w-[50%]">
        <div className="w-[43rem] h-[35rem] flex m-auto">
          <img className="w-full h-[full]" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}
