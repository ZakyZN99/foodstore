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
import { useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../utils";
import Navbar from "../../components/Navbar";

export const Dashboard = () => {
  const { categoryId } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItemsCount,setCartItemsCount] = useState(0)
  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [cart, setCart] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);
    
  // Go to specific page
  const goToPage = (page) => setCurrentPage(page);

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
    const fetchCartItems = async () => {
      try {
          if (token) {
              const res = await axios.get("http://localhost:3000/api/carts", {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });
              setCart(res.data);
              const newCartItemsCount = res.data.reduce((total, item) => total + item.qty, 0);
              setCartItemsCount(newCartItemsCount);
          } else {
              // If not logged in, set cart items to an empty array or handle as needed
              // Or you could redirect to the login page here if desired
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
    
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login"; 
      localStorage.removeItem("token");
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
  
      const res = await axios.put(
        "http://localhost:3000/api/carts",
        { items: itemsToUpdate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
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
      const url = searchInput ?  axios.get(`http://localhost:3000/api/product?search=${searchInput}`)
                : axios.get('http://localhost:3000/api/product')
            const res = await url
            setFilteredProducts(res.data.data);
        }catch(e){
    console.error('Error searching items:', e);
  }
}

  return (
    <>
    <Navbar onSearch={handleSearch} cartItemsCount={cartItemsCount}/>
    <div className=" text-white pl-20 max-w-[1440px] mx-auto pt-10">
      <div className="flex gap-3">
        <h1 className="font-bold ">Tags:</h1>
          {tags.map((tag) => (
            <button key={tag._id} className={`flex items-center border-1 rounded-xl p-1  ${
                selectedTag === tag._id ? 'bg-gray-600 '  : 'bg-gray-200 text-black'
              }`} onClick={() => setSelectedTag(tag._id)}>
            <div  className="flex">
              <div className="flex">
                <FaTag size={15} />
                <h3 className="pl-1 pr-1">{tag.name}</h3>
              </div>
            </div>
            </button>
          ))}
          <button className="bg-red-500 text-white px-2 rounded-md"
          onClick={handleResetFilter}>Reset Filter</button>
      </div>
      <div className="flex flex-wrap gap-3">
        {currentItems.map((product) => (
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
              <span className="text-lg font-semibold ">{product.name}</span>
              <p className="text-md font-normal ">{product.description}</p>
              <p className="pt-2 text-sm">{`Category: ${product.category.name ? product.category.name : "null" }`}</p>
              {product.tags.map((tag)=>
              <div key={tag._id} className="inline-flex pt-1">
                <div className="flex border-1 rounded-xl p-1 items-center mr-1">
                  <FaTag size={10}  className="mr-1"  />
                  <span className="text-sm">{tag.name}</span>
                </div>
              </div>
              )}
              <h5 className="mt-2 text-lg">{formatPrice(product.price)}</h5>
              <button className="flex justify-center border-1 w-20 h-10 items-center align-middle rounded-lg mt-8" onClick={() => addToCart(product._id)} >
                <FaCartPlus size={25} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination pt-2 gap-1">
            <button className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md" onClick={prevPage} disabled={currentPage === 1}>
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button key={page} className={`bg-blue-600 text-white h-[25px] px-[10px] rounded-md ${currentPage === page ? 'bg-blue-800' : ''}`} onClick={() => goToPage(page)}>
                {page}
              </button>
            ))}
            <button className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md" onClick={nextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
    </div>
    </>
  );
};