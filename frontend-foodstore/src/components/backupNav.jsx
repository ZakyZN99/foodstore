import { useEffect, useState } from "react";
import {
  IoPersonCircleOutline,
  IoCart,
} from "react-icons/io5";
import axios from "axios";
import { Link } from "react-router-dom";
import authService from "../services/authService";
import navigationPage from "../services/navigation";
import categoryService from "../services/categoryService";
import cartService from "../services/cartService";
import NaviLink from "./NaviLink";

const Navbar = ({onSearch, cartItemsCount}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const {loginNavigation, cartNavigation, profileNavigation } = navigationPage()

    
    const checkLoginStatus = async () => {
      try {        
        const res = authService.profile()
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          setUserData(res.data.user);
          authService.removeCurrentToken()
          authService.removeCurrentUser()
        } else {
          setIsLoggedIn(false);
          setUserData(null);
          loginNavigation();
        }
      } catch (e) {
        console("Error checking login status:", e);
      }
    };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (authService.getCurrentToken() && authService.getCurrentUser()) {
        setIsLoggedIn(true);
        setUserData(authService.getCurrentUser());
    }

    const fetchCategories = async () => {
        try {
            const res = await categoryService.getCategories()
            setCategories(res.data);
        } catch (e) {
            console("Error fetching categories:", e);
        }
    };

    // const fetchCartItems = async () => {
    //     try {
    //         if (authService.getCurrentToken()) {
    //             const res = await cartService.getCarts()
    //             setCartItems(res.data);
    //         } else {
    //             loginNavigation()
    //         }
    //     } catch (e) {
    //         console("Error fetching cart items:", e);
    //     }
    // };

    fetchCategories();
    // fetchCartItems();
}, []);

  const handleLogout = async () => {
      if (authService.getCurrentToken()) {
        await authService.logout();
        authService.removeCurrentToken();
        authService.removeCurrentUser();
        setIsLoggedIn(false);
        setUserData(null);
        loginNavigation();
      }else{
        throw new Error('Token not found in localStorage');
    }
  };

  const handleCategoryClick = () => {
    setIsCategorySelected(true); 
  };

  return (
    <div className="md:flex w-full flex-col sticky top-0 z-20 md:flex-row justify-between items-center bg-[#FA4A0C] h-20 text-black px-24 md:px-20 ">
      <div className="flex md:flex-row items-center text-center font-poppins text-[17px] font-semibold pt-2 gap-4">
        <Link to="/" className={location.pathname === "/" ? "text-[#FFF]" : ""}><h1 className=" font-poppins font-medium border-2 p-2 text-[28px] text-[#FFF]">C</h1></Link>
        <div className="md:flex gap-4" >
          {categories.map((category) => (
            <Link key={category._id} onClick={()=> handleCategoryClick()}   className={location.pathname === `/products/${category._id}` ? "text-[#FFF]" : "text-[#000]"}  to={`/products/${category._id}`}><h1 className="text-[17px] font-poppins font-semibold">{category.name}</h1></Link>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-3">
        <NaviLink search= {onSearch} cartItemsCount={cartItemsCount}/>
        {isLoggedIn ? (
          <button
            className="flex items-center gap-1"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <IoPersonCircleOutline
              size={40}
              title="Nama"
              color="#FFF"
            />
            <span className="text-[16px] text-[#fff] font-poppins font-medium">{userData.fullName}</span>
          </button>
        )  : <button onClick={checkLoginStatus}><IoPersonCircleOutline
              size={35}
              title="Nama"
              color="#FFF"
            /></button>}
        {isDropdownOpen && isLoggedIn &&(
          <div className="absolute right-[0%] mt-[150px] md:mt-[150px] w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-black">
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={profileNavigation}>
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
