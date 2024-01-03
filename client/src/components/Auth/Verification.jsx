"use client";
import { toast } from "react-hot-toast";
import React, { useEffect, useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useActivationMutation } from "../../features/auth/authApi";

const Verification = ({ setRoute }) => {
  const { token } = useSelector((state) => state.auth);
  const [activation, { isSuccess, error }] = useActivationMutation();
  const [invalidError, setInvalidError] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Access activated succesfully");
      setRoute("Login");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log();
      }
    }
  }, [error, isSuccess, setRoute]);

  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const [verifyNumber, setVerifyNumber] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({
      activation_token: token,
      activation_code: verificationNumber,
    });
  };

  const handleInputChange = (index, value) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div>
      <h1
        className={`${"text-[25px] text-white font-[500] font-Poppins text-center py-2 "}`}
      >
        Verify Your Account
      </h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="1100px:w-[70&] m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[key]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              invalidError ? "shake border-red-500" : "border-white"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button
          className={`${"flex flex-row justify-center items-center py-3 px-6 rounded-full cursor-pointer bg-[#2100ff] min-h-[45px] w-full text-[16px] font-Poppins font-semibold text-white"}`}
          onClick={verificationHandler}
        >
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-poppins text-[14px] text-white">
        Go back to Sign in?{" "}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};

export default Verification;
