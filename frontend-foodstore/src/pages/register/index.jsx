import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
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

        <button className="border-1 sm-full sm:w-36 h-8 ">Register</button>
      </form>
    </div>
  );
};

export default Register;
Register;
