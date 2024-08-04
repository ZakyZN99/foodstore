import React, { useEffect, useState } from 'react'
import authService from '../services/authService'
import cartService from '../services/cartService'
import navigation from '../services/navigation'
import navigationPage from '../services/navigation'
import { IoCart } from 'react-icons/io5'

const NaviLink = ({search, cartItemsCount} ) => {
    const [cartItems, setCartItems] = useState([])
    const {loginNavigation, cartNavigation, profileNavigation } = navigationPage()

    
    useEffect(() => {
        const fetchCartItems = async() => {
            try {
                if(authService.getCurrentToken()){
                    const res = await cartService.getCarts()
                    setCartItems(res.data)
                }else{
                    loginNavigation()
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchCartItems()
    },[])
    
    const handleSearch = async (e) => {
        search(e.target.value)
    }
    
    const totalCartItems = cartItems.reduce((total, item) => total + item.qty, 0);



    return (
        <div className={`md:flex items-center gap-4 `}>
            <input 
                type="text" 
                placeholder="Find in FoodStore" 
                className="border-[1px] border-[#000] rounded-lg min-w-44 md:w-[250px] h-[35px] p-[10px] text-black " 
                onChange={handleSearch}
            />
            <div className=' cursor-pointer' >
                {cartItemsCount > 0 && (
                <span className=" border-[#FFF] border-[2px] text-[#FFF] font-poppins font-medium rounded-2xl w-5 h-5 text-xs flex items-center justify-center">
                    {cartItemsCount ? cartItemsCount : totalCartItems}
                </span>
                )}
                <IoCart
                    size={35}
                    color='#ffff'
                    onClick={cartNavigation}
                />
            </div>
        </div>
    )
}

export default NaviLink
