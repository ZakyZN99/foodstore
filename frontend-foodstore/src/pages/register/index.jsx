import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import authService from "../../services/authService";
import Swal from 'sweetalert2'
import navigationPage from "../../services/navigation";

const Register = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const {loginNavigation, registerNavigation} = navigationPage();


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields.",
      });
      return;
    }

    if (!validateEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email address.",
      });
      return;
    }

    const res = await authService.cekEmail(email)
    if (res.data.message === "Email already exists. Please use a different email.") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email already exists. Please use a different email.",
      });
      return;
    }

    try {
      const data = {
        fullName,
        email,
        password,
      }
      await authService.register(data)
      Swal.fire({
        title: "Success!",
        text: "Your account has been created!",
        icon: "success"
      });
      loginNavigation()
    } catch (err) {
      console.error("Error registering:", err);
      if (err.response) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${err.response.data.message}`,
        });
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Registration failed. Please try again.`,
      });
    }
  };

  const validateEmail = (email) => {
    // Email validation logic
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="text-black w-[50%] mx-auto py-10 md:py-20">
      <div className="flex text-center font-bold bg-white text-white md:text-base text-sm">
        <button onClick={()=> loginNavigation()} className="w-full h-12 rounded-tl-2xl border-[1px]  text-[#FA4A0C]">Login</button>
        <button onClick={()=> registerNavigation()} className="w-full h-12  rounded-tr-2xl  bg-[#FA4A0C] border-[1px]  border-[#FA4A0C]  text-white" >Register</button>
      </div>
      <form className="w-[100%] border-[2px] p-[50px] bg-[#FFFFFF] rounded-b-2xl" onSubmit={handleSubmit} >
        <div className="mb-[20px] text-white md:text-base text-sm">
          <h2 className="pb-[10px] font-semibold text-[#131313]">Full name</h2>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            placeholder="Enter your name!"
            className=" text-black w-100 h-8 items-center border-b-2 border-[#000] p-2"
          />
        </div>
        <div className="mb-[20px] md:text-base text-sm">
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
        <div className="mb-[20px] md:text-base text-sm">
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
            <button type="button" className="absolute md:text-base text-sm inset-y-0 right-0 pr-2 flex items-center text-[#000000] hover:text-[#FA4A0C]" onClick={handleTogglePassword} >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>
        <div className=" items-center flex text-center justify-center pt-[25px]">
          <button className="w-full sm:w-[400px] h-[45px] md:text-[18px] text-[16px] font-semibold rounded-xl bg-[#FA4A0C] text-[#FFFF] hover:bg-[#ffff] hover:border-[2px] border-[#FA4A0C] hover:text-[#FA4A0C]">Register</button>
        </div>
        <div className="mb-4 pt-[20px]   ">
          <div className="flex justify-center items-center gap-2 md:text-base text-sm">
            <p >Have an account?</p><a href="/login" className="text-[#FA4A0C] font-semibold underline">Login</a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
