/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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

  let navigate = useNavigate();

  const handleLogin = () => {
  navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
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
    <div className="text-black w-[30%] mx-auto pt-[200px]">
    <div className="flex text-center font-bold bg-white">
      <button onClick={handleLogin} className="w-full h-12 rounded-tl-2xl bg-[#FA4A0C] border-[1px]  border-[#FA4A0C]  text-white">Login</button>
      <button onClick={handleRegister} className="w-full h-12 rounded-tr-2xl  border-[1px]  text-[#FA4A0C]">Register</button>
    </div>
      <form className="w-[100%] border-[2px] p-[50px] bg-[#FFFFFF] rounded-b-2xl" onSubmit={handleSubmit}>
        <div className="mb-[35px]">
          <h2 className="pb-[10px] font-semibold text-[#131313]">Email address</h2>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className=" text-black w-100 h-8 items-center border-b-2 border-[#000] p-2"
          />
        </div>
        <div className="mb-[20px]">
          <h2 className="pb-[10px] font-semibold text-[#131313]">Password</h2>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className=" text-black w-100 h-8 items-center border-b-2 border-[#000] p-2"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-2 flex items-center text-sm text-[#000000] hover:text-[#FA4A0C]"
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18} />}
          </button>
          </div>
        </div>
        
        <div className=" items-center flex text-center justify-center pt-[25px]">
          <button className="sm-full sm:w-[400px] h-[45px] text-[18px] font-semibold rounded-xl bg-[#FA4A0C] text-[#FFFF] hover:bg-[#ffff] hover:border-[2px] border-[#FA4A0C] hover:text-[#FA4A0C]">Login</button>
        </div>

        <div className="mb-4 pt-[20px] ">
          <div className="flex justify-center items-center gap-2">
            <p >Don`t have an account?</p><a href="/register" className="text-[#FA4A0C] font-semibold underline">Register</a>
          </div>
        </div>
      </form>
    </div>
  );
};
