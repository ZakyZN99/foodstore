import React, { Children, useEffect, useState } from 'react'
import { FaChevronLeft, FaHome, FaTags   } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline, IoFastFood, IoLogOutOutline  } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import authService from '../services/authService';

export const SideBar = () => {
    const[open, setOpen] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([])


    useEffect(()=> {
        if(authService.getCurrentToken && authService.getCurrentUser){
            setIsLoggedIn(true)
        }

        const handleGetProfile = async () => {
        try {
            const res = await authService.profile();
            setUserData(res.data)
        } catch (err) {
            console(err)
            }
        };
        handleGetProfile(); 
    },[])

    return (
        <div className={`fixed top-0 left-0 h-screen ${open ? 'w-72' : 'w-20' } p-4 pt-8 duration-300 bg-[#FA4A0C]  flex flex-col justify-between`}>
            <FaChevronLeft className={`absolute cursor-pointer rounded-full -right-4 top-9 w-7 p-1 h-7 border-1 border-[#000] bg-white ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
            <div className='flex gap-x-4 items-center'>
                <Link to="/" className={location.pathname === "/" ? "text-[#FFF]" : ""}><h1 className=" font-poppins font-medium border-2 p-2  text-[28px] text-[#FFF]">C</h1></Link>
                <h1 className={`font-poppins font-medium  text-[25px] text-[#000] ${!open && "scale-0"}`}>CravePizza</h1>
            </div>
            <ul className='pt-6 text-[16px] font-poppins font-medium text-[#000] '>
                <li className='cursor-pointer hover:bg-[#ffff]  hover:text-[#FA4A0C] rounded-md pb-2 '>
                    <Link to={"/me"} className={`flex items-center gap-x-4 ${location.pathname === "/me" ? "text-[#FA4A0C] bg-[#ffff] rounded-md p-1" : ""} `}>
                        <IoPersonCircleOutline size={20}/>
                        <span className={`${!open  && "hidden"} origin-left duration-200`}>Profile</span>
                    </Link>
                </li>
                <li className='cursor-pointer hover:bg-[#ffff]  hover:text-[#FA4A0C] rounded-md pb-2  '>
                    <Link to={"/orders"} className={`flex items-center gap-x-4 ${location.pathname === "/orders" ? "text-[#FA4A0C] bg-[#ffff] rounded-md p-1  " : ""} `}>
                        <IoFastFood size={20} className='hover:text-[#FA4A0C]'/>
                        <span className={`${!open  && "hidden"} origin-left duration-200`}>Orders</span>
                    </Link>
                </li>
                <li className='cursor-pointer hover:bg-[#ffff]  hover:text-[#FA4A0C] rounded-md pb-2'>
                    <Link to={"/address"} className={`flex items-center gap-x-4 ${location.pathname === "/address" ? "text-[#FA4A0C] bg-[#ffff] rounded-md p-1  " : ""} `}>
                        <FaHome  size={20}/>
                        <span className={`${!open  && "hidden"} origin-left duration-200`}>Address</span>
                    </Link>
                </li>
                {isLoggedIn && userData.role === 'admin' && (
                    <>
                    <li className='cursor-pointer hover:bg-[#ffff]  hover:text-[#FA4A0C] rounded-md pb-2 '>
                    <Link to={"/category"} className={`flex items-center gap-x-4 ${location.pathname === "/category" ? "text-[#FA4A0C] bg-[#ffff] rounded-md p-1  " : ""} `}>
                        <BiCategory  size={20}/>
                        <span className={`${!open  && "hidden"} origin-left duration-200`}>Categories</span>
                    </Link>
                    </li>
                    <li className='cursor-pointer p-1 hover:bg-[#ffff]  hover:text-[#FA4A0C] rounded-md pb-2 '>
                        <Link to={"/tag"} className={`flex items-center gap-x-4 ${location.pathname === "/tag" ? "text-[#FA4A0C] bg-[#ffff] rounded-md p-1  " : ""} `}>
                            <FaTags  size={20}/>
                            <span className={`${!open  && "hidden"} origin-left duration-200`}>Tags</span>
                        </Link>
                    </li>
                    <li className='cursor-pointer p-1  hover:bg-[#ffff]  hover:text-[#FA4A0C] rounded-md pb-2 '>
                        <Link to={"/product"} className={`flex items-center gap-x-4 ${location.pathname === "/product" ? "text-[#FA4A0C] bg-[#ffff] rounded-md p-1  " : ""} `}>
                            <IoFastFood   size={20}/>
                            <span className={`${!open  && "hidden"} origin-left duration-200`}>Products</span>
                        </Link>
                    </li>
                    </>
                )}
            </ul>
            <div className='mt-auto'>
                <div className=' flex text-[16px] font-poppins font-medium text-[#000] items-center gap-x-4 hover:bg-[#ffff]  hover:text-[#FA4A0C] rounded-md cursor-pointer p-1 '>
                    <Link to={""} className={`flex items-center gap-x-4 `}>
                        <IoLogOutOutline size={20} />
                        <span className={`${!open  && "hidden"} origin-left duration-200`}>Logout</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
