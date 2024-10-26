import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { json, Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [data, setData] = useState(null); // Initialize as null
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("users");
    setData(userData ? JSON.parse(userData) : null); // Parse only if userData is not null
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!data) {
      toast.error("No users found.");
      return;
    }

    if (validateForm()) {
      if (data.email === email && data.password === password) {
        toast.success("Login Successfully!");
        localStorage.setItem("auth", JSON.stringify(true));

        setTimeout(() => {
          navigate("/product-page");
        }, 400);
      } else {
        toast.error("User credentials are wrong!");
      }
    }
  };

  return (
    <div className="flex items-center justify-center my-10 bg-white">
      <Toaster />
      <div className="bg-white border rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <h2 className="font-bold text-3xl text-center">Login</h2>
        <p className="text-center text-xl text-gray-600 mt-2">
          Welcome back to <span className="font-bold">ECOMMERCE</span>
        </p>
        <p className="text-center my-2 text-gray-500 text-sm mb-6">
          The next-gen business marketplace
        </p>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-semibold">
            Password
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-10 text-gray-500 hover:text-gray-700 text-sm"
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition duration-200"
        >
          LOGIN
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an Account?{" "}
          <Link to="/sign-up" className="font-semibold text-black hover:underline">
            SIGN UP
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
