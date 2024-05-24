import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import Navbar from "../../components/Navbar";

const Register = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const checkEmailResponse = await axios.get(`http://localhost:3000/auth/cekEmail/${email}`);
      if (checkEmailResponse.data.message == "Email already exists. Please use a different email.") {
        alert('Email already exists. Please use a different email.');
        return;
      }
      const response = await axios.post("http://localhost:3000/auth/register", {
        fullName,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      // Optionally, you can redirect to another page or perform other actions
    } catch (error) {
      console.error("Error registering:", error);
      if (error.response) {
        alert("Response data: ", error.response.data.message);
      }
      alert('Registration failed. Please try again.');
    }
  };

  const validateEmail = (email) => {
    // Email validation logic
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
    <div className="text-white pl-20 max-w-[1440px] mx-auto pt-10">
      <form
        className="max-w-120px border-1 p-3 mx-96 mt-20"
        onSubmit={handleSubmit}
      >
        <h1 className=" text-lg pb-8 align-middle text-center font-semibold">
          Registration
        </h1>
        <div className="mb-3">
          <h2 className="pb-2">Nama Lengkap:</h2>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Enter your name!"
            className=" text-black w-100 h-8 items-center pl-2 rounded-md"
          />
        </div>
        <div className="mb-3">
          <h2 className="pb-2">Email:</h2>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email!"
            className=" text-black w-100 h-8 items-center pl-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <h2 className="pb-2">Password:</h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password!"
              className=" text-black w-100 h-8 items-center pl-2 rounded-md pr-8"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-blue-500 hover:text-blue-700"
              onClick={handleTogglePassword}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>
        <div className="mb-4 ">
          <div className="flex justify-end items-center gap-2">
            <p >Have an account?</p><a href="/login">Login</a>
          </div>
        </div>

        <button className=" bg-blue-500 text-black rounded-md hover:bg-green-500 sm-full sm:w-36 h-8 ">Register</button>
      </form>
    </div>
    </>
  );
};

export default Register;
