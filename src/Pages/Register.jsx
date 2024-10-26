import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  // Validate form
  const validate = () => {
    let formErrors = {};

    if (!formValues.name.trim()) {
      formErrors.name = "Name is required";
    }
    if (!formValues.email) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!formValues.password) {
      formErrors.password = "Password is required";
    } else if (formValues.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      
      toast.success('Form submitted successfully!')
    }
    localStorage.setItem("users",JSON.stringify(formValues))

    navigate("/email-verify")
  };

  return (
    <div className="flex items-center justify-center my-10 bg-white">
        <Toaster/>
      <div className="bg-white border rounded-lg shadow-lg p-8 w-full max-w-md">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-5 text-center">
          Create your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter"
              value={formValues.name}
              onChange={handleInputChange}
              className={`mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter"
              value={formValues.email}
              onChange={handleInputChange}
              className={`mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter"
                value={formValues.password}
                onChange={handleInputChange}
                className={`mt-1 w-full px-4 py-2 pr-16 border rounded focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 text-sm"
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition duration-200"
          >
            SIGN UP
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Have an Account?{" "}
          <Link to="/login" className="font-semibold text-black hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
