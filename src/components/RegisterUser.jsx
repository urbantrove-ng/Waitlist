import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";
import { post } from "../services/api"; 

export default function RegisterUser() {
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState("customer");

  const userRef = useRef();
  const navigate = useNavigate();

  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])[A-Za-z0-9!@#$%]{8,24}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword, PWD_REGEX]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email, EMAIL_REGEX]);

  function handleCategory(e) {
    setSelectCategory(e.target.value);

  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  async function registerUser(e) {
    e.preventDefault();
    const response = await post("/api/v1/auth/waitlist", {
      fullname: fullName,
      email,
      password,
      registeredAs: selectCategory,
    });
    if (response && typeof response !== "undefined") {
      if (response.body.data._doc.registeredAs.toLowerCase() === "merchant") {
        return navigate(`/merchant?id=${response.body.data._doc._id}`);
      } else {
        return navigate("/success");
      }
    }
  }

  return (
    <div className="lg:mt-0 text-center grid gap-[2rem] lg:gap-[1rem] py-[1rem] pb-[3rem]">
      <h1 className="text-[#444B59] text-[1.5rem] lg:text-[1.4rem] lg:px-0 font-[600] text-center z-40">
        HELLO, WELCOME TO URBAN TROVE&apos;S WAITLIST!
      </h1>
      <form
        action=""
        className="grid gap-[1rem] mx-[10rem] lg:mx-[0] px-[3rem] lg:px-0"
      >
        <div className="grid justify-center">
          <label className="text-start text-[#475569] font-[400]" htmlFor="">
            Name
          </label>
          <input
            type="text"
            ref={userRef}
            placeholder="Enter Your Fullname"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-[25rem] lg:w-[20rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#9ca3af]"
          />
        </div>
        <div className="grid justify-center">
          <label className="text-start text-[#475569] font-[400]" htmlFor="">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            className="w-[25rem] lg:w-[20rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#9ca3af]"
          />
          <p
            id="confirmnote"
            className={`${
              emailFocus && !validEmail
                ? "flex justify-center items-center gap-[0.3rem] bg-[#dc2626] text-white py-[0.3rem] rounded-[10px] mt-[0.3rem]"
                : "hidden"
            } `}
          >
            <BsExclamationCircle />
            Enter Valid Email Address
          </p>
        </div>
        <div className="grid justify-center relative">
          <label className="text-start text-[#475569] font-[400]" htmlFor="">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={validPwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className="w-[25rem] lg:w-[20rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#cbd5e1]"
          />
          <span
            className="absolute right-[1rem] top-[2.3rem] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {" "}
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          <p
            id="pwdnote"
            className={`${
              pwdFocus && !validPwd
                ? "flex justify-center gap-[0.3rem] bg-[#dc2626] text-white py-[0.3rem] rounded-[10px] mt-[0.3rem]"
                : "hidden"
            } `}
          >
            <BsExclamationCircle className="mt-[0.2rem] mr-[-3rem]" />
            Must Contain
            <br />
            8-24 Characters
            <br />
            Uppercase and Lowercase
            <br />
            Special Character (!@#$%)
            <br />
            A Number
            <br />
          </p>
        </div>
        <div className="grid justify-center relative">
          <label className="text-start text-[#475569] font-[400]" htmlFor="">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={validMatch ? "false" : "true"}
            aria-describedby="confirmnote"
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            className="w-[25rem] lg:w-[20rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#cbd5e1]"
          />
          <span
            className="absolute right-[1rem] top-[2.3rem] cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {" "}
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          <p
            id="confirmnote"
            className={`${
              matchFocus && !validMatch
                ? "flex justify-center gap-[0.3rem] bg-[#dc2626] text-white py-[0.3rem] rounded-[10px] mt-[0.3rem]"
                : "hidden"
            } `}
          >
            <BsExclamationCircle />
            Must match password.
          </p>
        </div>
        <div className="grid justify-center">
          <label className="text-start text-[#475569] font-[400]" htmlFor="">
            <p>What are you signing up as today?</p>
            <p>MERCHANT OR CUSTOMER</p>
          </label>
          <select
            className="w-[25rem] lg:h-[3rem] bg-white lg:w-[20rem] py-[1rem] px-[1rem] rounded-[50px] border-[#647C0C] border-[1px] focus:outline-none"
            name="category"
            id="category"
            value={selectCategory}
            onChange={handleCategory}
          >
            <option value="customer">Customer</option>
            <option value="merchant">Merchant</option>
          </select>
        </div>
        <button
          disabled={
            isLoading ||
            fullName === "" ||
            !validEmail ||
            !validPwd ||
            !validMatch
          }
          onClick={registerUser}
          className="bg-[#647C0C] mt-[1rem] w-[25rem] lg:w-[20rem] py-[0.7rem] rounded-[50px] text-[#fff] flex m-auto justify-center disabled:bg-[#ecfccb]"
        >
          Register
        </button>
      </form>
    </div>
  );
}
