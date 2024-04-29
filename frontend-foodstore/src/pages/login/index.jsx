import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      console.log(res.data.user);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // setUserData(res.data.user);
      setIsLoggedIn(true);

      alert("Login Successful");
      navigate("/", { replace: true });  

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
      navigate("/", { replace: true });
    }
  }, []);

  if (isLoggedIn) {
    return <div>Already logged in. Redirecting...</div>;
  }

  return (
    <div className="text-white pl-20 max-w-[1440px] mx-auto pt-10">
      <form className="max-w-120px border-1 p-3 mx-96 mt-20" onSubmit={handleSubmit}>
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
        <div className="mb-4 pl-80">
          <div className="flex justify-center items-center gap-2">
            <h5 >Don`t have an account?</h5><a href="/register">Register</a>
          </div>
        </div>
 
        <button className="border-1 sm-full sm:w-36 h-8 ">Login</button>
      </form>
    </div>
  );
};
