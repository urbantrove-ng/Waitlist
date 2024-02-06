import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Merchant() {
  const userRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  function successful() {
    navigate("/success");
  }
  return (
    <div className=" mt-[4rem] text-center grid gap-[2rem] text-[#444B59] px-[10rem] py-[1rem] pb-[3rem]">
      <h1 className="text-[2rem] uppercase font-[700]">
        Hello Merchant, ready to make more money?
      </h1>
      <form action="" className="grid gap-[1rem]">
        <div className="grid justify-center">
          <label className="text-start text-[#475569] font-[400]" htmlFor="">
            Product or Service?
          </label>
          <input
            type="text"
            ref={userRef}
            className="w-[25rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none"
          />
        </div>
        <div className="grid justify-center">
          <label className="text-start text-[#475569] font-[400]" htmlFor="">
            Category
          </label>
          <input
            type="text"
            className="w-[25rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none"
          />
        </div>
        <button onClick={successful} className="bg-[#647C0C] text-[1.1rem] mt-[1rem] w-[25rem] py-[0.7rem] rounded-[50px] text-[#fff] flex m-auto justify-center">
          Continue
        </button>
      </form>
    </div>
  );
}
