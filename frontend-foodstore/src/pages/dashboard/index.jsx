/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Image from "../../assets/img/Image.jpg";
import {
  FaCartPlus,
  FaChevronLeft,
  FaChevronRight,
  FaTag,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils";

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userDataFromStorage = localStorage.getItem('user');
    if (token && userDataFromStorage) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(userDataFromStorage));
    }

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/product");
        setProducts(res.data.data);
        console.log(res.data.data)
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };

    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/tags");
        setTags(res.data);
        // console.log(res.data);
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };
    
    fetchTags();
    fetchProducts();
  }, []);

  const addToCart = async (productId, qty) => {
    // Add logic to add the product to the cart
    try {
      const update = {
        items: [{ product: { _id: productId }, qty }],
      };

      const res = await axios.put("http://localhost:3000/api/carts", update, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(res.data)
      if (res.data.message !== "jwt malformed") {
        const updatedCart = res.data
        console.log("Updated Cart:", updatedCart);
        const existingItemIndex = updatedCart.findIndex(
          (item) => item.product._id === productId
        );
        const updatedItems = [...updatedCart];
        

        if (existingItemIndex !== -1) {
          // Product already exists in the cart, increment quantity
          const updatedItems = [...updatedCart];
          updatedItems[existingItemIndex].qty += 1;
          
  
          const updatedCartData = {
            items: updatedItems,
          };
  
          await axios.put(
            "http://localhost:3000/api/carts",
            updatedCartData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
        }
        
      }else{
        window.location.href='/login'
      }
    } catch (e) {
      console.error("Error checking login status:", e);
    }
  };

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

  const handleNextSlide = () => {
    setStartIndex(startIndex + 8);
  };

  const handlePrevSlide = () => {
    setStartIndex(Math.max(0, startIndex - 8));
  };

  return (
    <div className=" text-white pl-20 max-w-[1440px] mx-auto pt-10">
      <h1 className=" text-lg pb-4 underline font-bold">Dashboard</h1>
      <div className="pt-2 flex gap-3">
        <h1 className="font-bold ">Tags:</h1>
        <button className="flex items-center">
          {tags.map((tag) => (
            <div key={tag._id} className="flex">
              <div className="flex border-1 rounded-xl mr-3">
                <FaTag size={15} />
                <h3 className="pr-3">{tag.name}</h3>
              </div>
            </div>
          ))}
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {products.slice(startIndex, startIndex + 8).map((product) => (
          <div
            key={product._id}
            className=" bg-gray-800 w-72 h-105 border-gray-300 shadow rounded-lg mt-10"
          >
            <img
              className=" rounded-lg"
              alt={product.name}
              src={getImageUrl ? getImageUrl(product.image_url) : Image}
              crossOrigin="anonymous"
              style={{ width: "100%", height: "200px" }}
            />
            <div className="p-3">
              <a href="#">
                <span className="text-lg font-semibold ">{product.name}</span>
              </a>
              <h2 className="pt-2">{product.category.name}</h2>
              <div className="flex items-center pt-2">
                <FaTag size={10} />
                <h3>{product.tags.name}</h3>
              </div>
              <h5 className="mt-2 text-lg">{formatPrice(product.price)}</h5>
              <button className="flex justify-center border-1 w-20 h-10 items-center align-middle rounded-lg mt-8" onClick={() => addToCart(product._id, 1)} >
                <FaCartPlus size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex inline-flex mt-4 gap-2">
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
          onClick={handlePrevSlide}
        >
          <FaChevronLeft /> Prev
        </button>
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded-lg"
          onClick={handleNextSlide}
        >
          <FaChevronRight />
          Next
        </button>
      </div>
    </div>
  );
};