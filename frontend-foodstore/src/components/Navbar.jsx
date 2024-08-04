import { useEffect, useState } from "react";
import {
  IoPersonCircleOutline,
  IoCart,
  IoMenu,
  IoClose,
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
  const [isOpen, setIsOpen] = useState(false)

    
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
    fetchCategories();
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
    <div className="bg-[#FA4A0C] sticky top-0 z-20 right-0 w-auto">
      <div className="md:flex justify-between items-center bg-[#FA4A0C] md:px-18 py-3 px-10">
        <div className="md:flex items-center gap-4">
            <div className="flex items-center ">
              <Link to="/" className={location.pathname === "/" ? "text-[#FFF]" : ""}>
                <h1 className=" font-poppins flex items-center font-medium border-1 p-2 text-[28px] text-[#FFF]">C</h1>
              </Link> 
            </div>
            <div className={`md:flex gap-4 hidden  md:items-center  bg-[#FA4A0C] transition-all z-1 duration-500 ease-in ${isOpen ? 'top-20 ':'hidden'}`}>
              {categories.map((category) => (
                <Link key={category._id} onClick={()=> handleCategoryClick()}
                  className={location.pathname === `/products/${category._id}` ? "text-[#FFF]" : "text-[#000]"} 
                  to={`/products/${category._id}`}>
                      <h1 className="text-[17px] md:flex  items-center font-poppins font-semibold sm:pb-3 md:pb-0 ">{category.name}</h1>
                </Link>
              ))}
            </div>
        </div>
        <div onClick={()=> setIsOpen(!isOpen)}>
            {
              !isOpen ?  <IoMenu
            className="absolute right-8 top-6 md:hidden" size={32}
          ></IoMenu> :<IoClose  className="absolute right-8 top-6 md:hidden" size={32}></IoClose>
            }
        </div>
        <div className={`md:flex items-center mr-6 truncate gap-4 hidden bg-[#FA4A0C ]  transition-all z-1 duration-500 ease-in ${isOpen ? 'top-48 ':'hidden'}`}>
          <NaviLink search= {onSearch} cartItemsCount={cartItemsCount} isOpen={isOpen}/>
          <div className=" bg-[#FA4A0C] h-full right-0">
            { isLoggedIn ? (
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
              /></button>
            }
            {isDropdownOpen && isLoggedIn &&(
              <div className="absolute md-right-3 md:mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-black">
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


      </div>

      {/* Small view */}
      {isOpen ? (
        <div className={`transition-all ml-10 pb-3 space-y-2 z-1 duration-500 ease-in ${isOpen ? 'top-20 ':'top-[-490px]'}`}>
          <div className={`md:hidden gap-4 flex-col  md:items-center  bg-[#FA4A0C] `}>
                {categories.map((category) => (
                  <Link key={category._id} onClick={()=> handleCategoryClick()}
                    className={location.pathname === `/products/${category._id}` ? "text-[#FFF]" : "text-[#000]"} 
                    to={`/products/${category._id}`}>
                        <h1 className="text-[17px] md:flex items-center font-poppins font-semibold sm:pb-3 md:pb-0 ">{category.name}</h1>
                  </Link>
                ))}
          </div>
          <div className={`md:hidden items-center flex-col bg-[#FA4A0C]  transition-all z-1 duration-500 ease-in ${isOpen ? 'top-48 ':'hidden'}`}>
          <NaviLink search= {onSearch} cartItemsCount={cartItemsCount} isOpen={isOpen}/>
          <div className="pt-3 md:pt-0">
            { isLoggedIn ? (
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
              /></button>
            }
            {isDropdownOpen && isLoggedIn &&(
              <div className="absolute md-right-3 mt-1 md:mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-black">
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
        </div>
        
      ): null}
    </div>
  );
};

export default Navbar;
