/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  IoPersonCircleOutline,
  IoCart,
} from "react-icons/io5";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({onSearch, cartItemsCount}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [Products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [cartItems, setCartItems] = useState([]);

    //Route ADD ITEM
    let navigate = useNavigate();

    const  handleViewCart = () =>{
      let path = '/carts';
      navigate(path);
    }
    const handleProfile = () =>{
      // navigate('/me')
      window.location.href = '/me'
    }
    
    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const res = await axios.get("http://localhost:3000/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          setUserData(res.data.user);
          localStorage.removeItem('token'); // Remove the token from localStorage
      localStorage.removeItem('user');
        } else {
          setIsLoggedIn(false);
          setUserData(null);
          window.location.href= "/login"
        }
      } catch (e) {
        console.error("Error checking login status:", e);
      }
    };
  



  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataFromStorage = localStorage.getItem('user');

    if (token && userDataFromStorage) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(userDataFromStorage));
    }

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/categories');
            setCategories(res.data);
        } catch (e) {
            console.error("Error fetching categories:", e);
        }
    };

    const fetchCartItems = async () => {
        try {
            if (token) {
                const res = await axios.get("http://localhost:3000/api/carts", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCartItems(res.data);
            } else {
                // If not logged in, set cart items to an empty array or handle as needed
                // Or you could redirect to the login page here if desired
                window.location.href = "/login";
            }
        } catch (e) {
            console.error("Error fetching cart items:", e);
        }
    };

    fetchCategories();
    fetchCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  //create search product
  const handleSearch = async (e) => {
    onSearch(e.target.value)
  }

  const handleLogout = async () => {
    
    try {
      const token = localStorage.getItem('token');
      // console.log('Token:', token);

      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      const response = await axios.post('http://localhost:3000/auth/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Logout response:', response.data);
      
      localStorage.removeItem('token'); // Remove the token from localStorage
      localStorage.removeItem('user'); // Remove the token from localStorage
      setIsLoggedIn(false);
      setUserData(null);
    navigate('/login'); // Redirect to the login page after logout
    } catch (e) {
      console.error("Error logging in:", e);  
      alert("Logout failed.");  
    }
    
  };

  const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);
  const isDashboard = location.pathname === "/";

  return (
    <div className="flex justify-between items-center h-20 mx-auto bg-gray-900 text-white pl-10 pr-10">
      <div className="flex items-center gap-4">
        <Link to="/"><h1>FOODSTORE</h1></Link>
        {categories.map((category) => (
          <Link key={category._id} to={`/categories/${category._id}`}><h1 >{category.name}</h1></Link>
        ))
          }
      </div>
      <div className="flex justify-between items-center gap-3">
      {isDashboard &&(
        <>
        <div className="flex gap-3">
          <input type="text" placeholder="Cari di FoodStore" className=" placeholder-black w-100 h-7 p-2 text-black"
            onChange={handleSearch}
          />
        </div>
        <button>
          
          {cartItemsCount > 0 && (
            <span className="bg-red-500 text-white rounded-full w-4 h-4 text-xs flex items-end justify-center">
              {cartItemsCount ? cartItemsCount : totalCartItems}
            </span>
          )}
          <IoCart size={30} onClick={handleViewCart} />
        </button>
        </>
      )}
        {isLoggedIn ? (
          <button
            className="flex items-center gap-1"
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <IoPersonCircleOutline
              size={30}
              onClick={() => console.log("CLICKED")}
              title="Nama"
            />
            <span className="text-sm font-medium" >{userData.fullName}</span>
          </button>
        )  : <button onClick={checkLoginStatus}><IoPersonCircleOutline
              size={30}
              title="Nama"
            /></button>}
        {isDropdownOpen && isLoggedIn &&(
          <div className="absolute right-[0%] mt-[160px] w-40 bg-white border border-gray-200 shadow-lg rounded-md z-10 text-white bg-transparent">
            <ul className="py-1">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleProfile}>
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
