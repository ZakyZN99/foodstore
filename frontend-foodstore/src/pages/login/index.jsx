import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../../services/authService";
import navigationPage from "../../services/navigation";
import Swal from 'sweetalert2'

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const {loginNavigation, registerNavigation} = navigationPage();

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
      const res = await authService.login(email,password)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsLoggedIn(true);

      Swal.fire({
        title: "Success",
        text: "Login Successful",
        icon: "success",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });

    } catch (e) {
      console.error("Error logging in:", e); 
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Login failed. Please check email or password.",
      });
    }
  };

  if (isLoggedIn) {
    Swal.fire({
      title: "Success",
      text: "Login Successful",
      icon: "success",
      confirmButtonText: "OK"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  }

  return (
    <div className="text-black w-[50%] mx-auto py-10 md:py-20">
    <div className="flex text-center font-bold bg-white">
      <button onClick={()=> loginNavigation()} className="w-full h-12 rounded-tl-2xl bg-[#FA4A0C] border-[1px]  border-[#FA4A0C]  text-white md:text-base text-sm">Login</button>
      <button onClick={()=> registerNavigation()} className="w-full h-12 rounded-tr-2xl  border-[1px]  text-[#FA4A0C] md:text-base text-sm">Register</button>
    </div>
      <form className="w-[100%] border-[2px] p-[50px] bg-[#FFFFFF] rounded-b-2xl" onSubmit={handleSubmit}>
        <div className="mb-[20px]">
          <h2 className="pb-[10px] font-semibold text-[#131313] md:text-base text-sm">Email address</h2>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className=" text-black md:text-base text-sm w-100 h-8 items-center border-b-2 border-[#000] p-2"
          />
        </div>
        <div className="mb-[20px]">
          <h2 className="pb-[10px] font-semibold text-[#131313] md:text-base text-sm">Password</h2>
          <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className=" text-black w-100 h-8 items-center border-b-2 border-[#000] p-2 md:text-base text-sm"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-2 flex items-center md:text-sm text-xs text-[#000000] hover:text-[#FA4A0C]"
            onClick={handleTogglePassword}
          >
            {showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18} />}
          </button>
          </div>
        </div>
        
        <div className=" items-center flex text-center justify-center pt-[25px]">
          <button className="w-full sm:w-[400px] h-[45px] md:text-[18px] text-[16px] font-semibold rounded-xl bg-[#FA4A0C] text-[#FFFF] hover:bg-[#ffff] hover:border-[2px] border-[#FA4A0C] hover:text-[#FA4A0C]">Login</button>
        </div>

        <div className="mb-4 pt-[20px] ">
          <div className="flex justify-center items-center gap-2 md:text-base text-sm">
            <p >Don`t have an account?</p><a href="/register" className="text-[#FA4A0C] font-semibold underline">Register</a>
          </div>
        </div>
      </form>
    </div>
  );
};
