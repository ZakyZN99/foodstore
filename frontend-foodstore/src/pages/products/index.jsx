/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Image from "../../assets/img/Image.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatPrice } from "../../utils";
import Navbar from "../../components/Navbar";
import authService from "../../services/authService";
import productService from "../../services/productService";
import tagService from "../../services/tagService";
import cartService from "../../services/cartService";
import { PrimaryButton } from "../../components/button/PrimaryButton";

export const Products = () => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItemsCount,setCartItemsCount] = useState(0)
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTag, setSelectedTag] = useState(null);
  const [cart, setCart] = useState([]);


  useEffect(() => {
    if (authService.getCurrentToken() && authService.getCurrentUser()) {
      setIsLoggedIn(true);
    }

    const fetchProducts = async () => {
      try {
        const res = await productService.getProducts()
        setProducts(res.data.data);
      } catch (e) {
        console.error("Error fetching Products:", e);
      }
    };

    const fetchTags = async () => {
      try {
        const res = await tagService.getTags()
        setTags(res.data);
      } catch (e) {
        console.error("Error fetching Tags:", e);
      }
    };
    const fetchCartItems = async () => {
      try {
        if (authService.profile()) {
              const res = await cartService.getCarts()
              setCart(res.data);
              const newCartItemsCount = res.data.reduce((total, item) => total + item.qty, 0);
              setCartItemsCount(newCartItemsCount);
          } else {
              window.location.href = "/login";
          }
      } catch (e) {
          console.error("Error fetching cart items:", e);
      }
  };
    fetchTags();
    fetchProducts();
    fetchCartItems();
    
  }, []);

  useEffect(() => {
    const filterProducts = (searchInput) => {
      let filtered = products;

      // Filter by category if categoryId is provided
      if (categoryId) {
        filtered = filtered.filter((product) => product.category._id === categoryId);
      }

      // Filter by selected tag if selectedTag is provided
      if (selectedTag) {
        filtered = filtered.filter((product) =>
          product.tags.some((tag) => tag._id === selectedTag)
        );
      }
      if (searchInput) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [categoryId, products, selectedTag]);



  const getImageUrl = (imageName) => {
    try {
      if (imageName && imageName.trim() !== "") {
        return `http://localhost:3000/public/images/product/${imageName}`;
      } else {
        return Image;
      }
    } catch (error) {
      console.error("Error fetching img:", error);
    }
  };

  const handleResetFilter = () => {
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const addToCart = async (productId, event) => {
    if (!authService.getCurrentToken()) {
      window.location.href = "/login"; 
      authService.removeCurrentToken()
      return; 
  }
  
    try {
      const existingItem = cart.find((item) => item.product._id === productId);
      let updatedCart;
  
      if (existingItem) {
        updatedCart = cart.map((item) =>
          item.product._id === productId ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        const productToAdd = products.find((product) => product._id === productId);
        const newItem = { product: productToAdd, qty: 1 };
        updatedCart = [...cart, newItem];
      }
  
      const itemsToUpdate = updatedCart.map(({ product, qty }) => ({
        product: { _id: product._id },
        qty,
      }));
  
      const res = await cartService.putCart(itemsToUpdate);
      if (res.status === 200) {
        setCart(updatedCart);
        const newCartItemsCount = updatedCart.reduce((total, item) => total + item.qty, 0);
        setCartItemsCount(newCartItemsCount);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleSearch = async (searchInput) => {
    try {
      const url = searchInput ?  productService.search(searchInput)
                : productService.getProducts()
            const res = await url
            setFilteredProducts(res.data.data);
        }catch(e){
    console.error('Error searching items:', e);
  }
}

  return (
    <div>
      <Navbar onSearch={handleSearch} cartItemsCount={cartItemsCount}/>
      <div className=' px-2 sm:px-4 lg:px-14 py-4'>
        <div className="flex flex-wrap gap-3 pb-8 md:mx-20 mx-10">
              <select
                className="cursor-pointer text-black border-[2px] border-[#FA4A0C] md:w-[200px] md:text-[18px] text-[12px] w-34 h-10 md:h-[40px] rounded-xl p-1"
                value={selectedTag || ""}
                onChange={(e) => setSelectedTag(e.target.value || null)}>
                  <option className="text-black " value="">Choose Tags</option>
                  {tags.map((tag) => (
                    <option key={tag._id} value={tag._id} className="text-black">
                      {tag.name}
                    </option>
                  ))}
              </select>
              <PrimaryButton className="bg-[#FA4A0C] text-white px-1 rounded-xl w-[130px]"
            onClick={handleResetFilter}>Reset Filter</PrimaryButton>
        </div>
        <div className='flex flex-wrap gap-3 justify-normal mx-10 md:mx-20'>
            {filteredProducts.map((product) => (
                <div key={product._id} className=' flex shadow-slate-600'>
                    <div className='md:w-[270px] w-32 md:h-[450px]  border-black  shadow rounded-lg flex flex-col transition-all duration-700 ease-in-out'>
                        <img src={getImageUrl ? getImageUrl(product.image_url) : Image} crossOrigin="anonymous" className='w-full md:h-[200px] h-24 rounded-t-lg object-cover' />
                        <div className='flex-grow px-2 md:px-[20px] py-2 md:py-[20px] flex flex-col'>
                            <h1 className=' md:text-[18px] text-[10px] font-bold pb-[10px] text-center'>{product.name}</h1>
                            <p className='md:text-[13px] text-[8px] md:pb-[4px] pb-2 font-poppins text-center justify-center'>{product.tags.map((tag, index) => (index ? `, ${tag.name}` : tag.name))}</p>
                            <div className='mt-auto flex md:pb-[10px] pb-2 items-center justify-between'>
                                <p className='md:text-[18px] text-[8px] font-semibold'>{formatPrice(product.price)}</p>
                                <div className='flex items-center md:pt-[5px] pt-1'>
                                    <button className='md:w-[100px] w-14 md:text-[16px] text-[8px] font-semibold border-[#FA4A0C] border-[2px] text-[#FA4A0C] rounded-2xl md:h-[40px] h-5 ' onClick={() => addToCart(product._id)}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}  
        </div>
      </div>
    </div>
  );
};