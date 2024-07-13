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
import { formatPrice } from "../../../utils";
import Navbar from "../../../components/Navbar";

import Cover from "./Cover";
import ProductsGrid from "./ProductGrid";

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
      <Cover/>
      <ProductsGrid/>
    </>
  );
};