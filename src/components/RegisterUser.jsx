import React, { useEffect, useRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs"; 


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

  const [purpose, setPurpose] = useState("");
  const [validPurpose, setValidPurpose] = useState(false);
  const [purposeFocus, setPurposeFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


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

  useEffect(() => {
    const input = purpose.toLowerCase(); // Convert input to lowercase for case-insensitive comparison
    const isValid = input === "merchant" || input === "customer";
    setValidPurpose(isValid);
  }, [purpose]);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }
  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  function registerUser() {
    navigate("/merchant");
  }

  return (
    <div className=" text-center grid gap-[2rem] py-[1rem] pb-[3rem]">
      <h1 className="text-[#444B59] text-[1.5rem] font-[600]">
        HELLO, WELCOME TO URBAN TROVE'S WAITLIST!
      </h1>
      <form action="" className="grid gap-[1rem] mx-[10rem] px-[3rem]">
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
            className="w-[25rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#9ca3af]"
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
            className="w-[25rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#9ca3af]"
          />
          <p
            id="confirmnote"
            className={`${emailFocus && !validEmail ? "flex justify-center items-center gap-[0.3rem] bg-[#dc2626] text-white py-[0.3rem] rounded-[10px] mt-[0.3rem]" : "hidden"} `}
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
            className="w-[25rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#cbd5e1]"
          />
          <span
            className="absolute right-[3rem] top-[2.3rem] cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {" "}
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          <p
          id="pwdnote"
          className={`${pwdFocus && !validPwd ? "flex justify-center gap-[0.3rem] bg-[#dc2626] text-white py-[0.3rem] rounded-[10px] mt-[0.3rem]" : "hidden"} `}
          >
          <BsExclamationCircle className="mt-[0.2rem] mr-[-3rem]"/>
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
            className="w-[25rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#cbd5e1]"
          />
          <span
            className="absolute right-[3rem] top-[2.3rem] cursor-pointer"
            onClick={toggleConfirmPasswordVisibility}
          >
            {" "}
            {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          <p
          id="confirmnote"
          className={`${matchFocus && !validMatch ? "flex justify-center gap-[0.3rem] bg-[#dc2626] text-white py-[0.3rem] rounded-[10px] mt-[0.3rem]" : "hidden"} `}
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
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            onFocus={() => setPurposeFocus(true)}
            onBlur={() => setPurposeFocus(false)}
            className="w-[25rem] py-[0.5rem] px-[0.5rem] rounded-[20px] border-[#647C0C] border-[1px] focus:outline-none placeholder:text-[#cbd5e1]"
          />
          <p
          id="confirmnote"
          className={`${purposeFocus && !validPurpose ? "flex justify-center items-center gap-[0.3rem] bg-[#dc2626] text-white py-[0.3rem] rounded-[10px] mt-[0.3rem]" : "hidden"} `}
        >
          <BsExclamationCircle />
          Customer or Merchant Only
        </p>
        </div>
        <button
         disabled={
            isLoading ||
            fullName === "" ||
            !validEmail ||
            !validPwd ||
            !validMatch ||
            !validPurpose
          }
          onClick={registerUser}
          className="bg-[#647C0C] mt-[1rem] w-[25rem] py-[0.7rem] rounded-[50px] text-[#fff] flex m-auto justify-center disabled:bg-[#ecfccb]"
        >
          Register
        </button>
      </form>
    </div>
  );
}