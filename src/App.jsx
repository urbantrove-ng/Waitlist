import React from "react";
import logo from "../src/assets/images/logo1.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Merchant from "./components/Merchant";
import SuccessPage from "./components/SuccessPage";

export default function App() {
  return (
    <div className="flex my-[8rem] justify-center items-center lg:my-[0.1rem]  lg:flex-col-reverse">
      <div className="w-[50%] lg:w-[20rem] grid">
        <Router>
          <Routes>
            <Route path="/" element={<RegisterUser />} />
            <Route path="/merchant" element={<Merchant />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </Router>
      </div>
      <div className="w-[50%] sm:w-[20rem]">
        <div className="w-[43rem] h-[35rem] flex m-auto items-start lg:w-[25rem] lg:h-[20rem] sm:h-[32vh] sm:w-[82vw]">
          <img className="w-full h-[full]" src={logo} alt="" />
        </div>
      </div>
    </div>
  );
}
