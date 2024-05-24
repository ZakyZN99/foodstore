/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Email and password are required!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      console.log(JSON.stringify(res.data.user));
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setUserData(res.data.user);
      setIsLoggedIn(true);

      alert("Login Successful");
      window.location.href= "/"

    } catch (e) {
      console.error("Error logging in:", e);  
      alert("Login failed. Please check email or password.");  
    }
    // // Perform login logic here
    // console.log('Email:', email);
    // console.log('Password:', password);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      window.location.href= "/"
    }else{
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn) {
    return <div>Already logged in. Redirecting...</div>;
  }

  return (
    <div className="text-white w-[30%] mx-auto pt-20">
      <form className="w-[100%] border-1 p-3" onSubmit={handleSubmit}>
        <h1 className=" text-lg pb-8 align-middle text-center font-semibold">
          Login
        </h1>
        <div className="mb-3">
          <h2 className="pb-2">Email:</h2>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address!"
            className=" text-black w-100 h-8 items-center pl-2 rounded-md"
          />
        </div>
        <div className="mb-2">
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
            {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18} />}
          </button>
          </div>
        </div>
        <div className="mb-4 ">
          <div className="flex justify-end items-center gap-2">
            <p >Don`t have an account?</p><a href="/register">Register</a>
          </div>
        </div>
 
        <button className="sm-full sm:w-36 h-8 rounded-md bg-blue-500 text-black hover:bg-green-500">Login</button>
      </form>
    </div>
  );
};
