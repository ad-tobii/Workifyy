import React, { useState, useRef } from "react";

const OtpForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const inputRefs = Array.from({ length: 5 }, () => useRef(null));

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    if (value && index < otp.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join("");
    if (otpString.length !== 5) {
      alert("Please enter the complete OTP.");
      return;
    }
    console.log("OTP entered:", otpString);
    alert(`OTP submitted: ${otpString}`);
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h1 className="text-2xl font-semibold">OTP Verification</h1>
      <p className="mt-4">Enter the OTP sent to your email</p>

      <div className="mt-6 flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            className="h-14 w-12 text-center text-2xl border border-green-500 rounded-lg outline-none"
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      <button
        className="mt-6 px-6 py-2 rounded bg-green-500 text-white font-bold"
        onClick={handleVerifyOtp}
        disabled={otp.includes("")}
      >
        Verify
      </button>
    </div>
  );
};

export default OtpForm;
