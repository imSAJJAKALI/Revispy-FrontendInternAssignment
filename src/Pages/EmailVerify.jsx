import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  const [code, setCode] = useState(Array(8).fill(''));
  const [email, setEmail] = useState('');
  const [randomOtp,setRandomOtp] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('users'));
    if (data && data.email) {
      setEmail(data.email);
    }
  }, []);

  useEffect(() => {
    if (email) {
      const randomNumber = generateEightDigitRandomNumber();
      alert(`Generated Code: ${randomNumber}`);
      setRandomOtp(randomNumber)
    }
  }, [email]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]*$/.test(value)) return; // Only allow numbers

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Focus the next input if there is a value
    if (value && index < code.length - 1) {
      document.getElementById(`code-input-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    // alert(`Code entered: ${code.join('')}`);
    if(randomOtp==code.join("")){
        toast.success("User Register successfully")
        navigate("/login")
    }else{
        toast.error("Put correct OTP")
    }

  };

  function generateEightDigitRandomNumber() {
    return Math.floor(10000000 + Math.random() * 90000000);
  }

  return (
    <div className="flex justify-center items-center mt-10 bg-white">
        <Toaster/>
      <div className="bg-white border rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center">Verify your email</h2>
        <p className="text-center text-gray-600 mt-2 mb-6">
          Enter the 8-digit code you received on{' '}
          <span className="font-semibold">{email}</span>
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50"
        >
          VERIFY
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;
