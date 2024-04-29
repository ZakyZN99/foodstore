import { useEffect, useState } from "react";
import Image from "../../assets/img/Image.jpg";
import { FaCartPlus, FaTag } from "react-icons/fa";
import axios from 'axios';

export const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [tags, setTags] = useState([])
  useEffect(() => {
    const fetchProducts = async ()=>{
      try {
        const res = await axios.get('http://localhost:3000/api/product')
        setProducts(res.data.data)
        // console.log(res.data.data)
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    }

    const fetchTags = async ()=>{
      try {
        const res = await axios.get('http://localhost:3000/api/tags')
        setTags(res.data)
        console.log(res.data)
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    }
    fetchTags();
    fetchProducts();
  },[])

  const getImageUrl = (imageName) => {
    return `http://localhost:3000/public/images/product/${imageName}`;
  };

  return (
    <div className=" text-white pl-20 max-w-[1440px] mx-auto pt-10">
      <h1 className=" text-lg pb-4 underline font-bold">Dashboard</h1>
      <div className="pt-2 flex gap-3">
      <h1 className="font-bold ">Tags:</h1>
      <button className="flex items-center">
      {tags.map((tag)=>(
        <div key={tag._id} className="flex">
          <div className="flex border-1 rounded-xl mr-3">
            <FaTag size={15}/>
            <h3 className="pr-3">{tag.name}</h3>
          </div>
        </div>
      ))}
      </button>
      </div>
      <div className="flex gap-4">
      {products.map((product) => (
        <div key={product._id}  className=" bg-gray-800 w-72 h-105 border-gray-300 shadow rounded-lg mt-10">
          <img className=" rounded-lg" alt={product.name} src={getImageUrl(product.image_url) || Image} crossOrigin="anonymous" />
          <div className="p-3">
            <a href="#">
              <h1>{product.name}</h1>
            </a>
            <h2 className="pt-2">{product.category.name}</h2>
            <div className="flex items-center pt-2">
              <FaTag size={10} />
              <h3>{product.tags.name}</h3>
            </div>
            <h5 className="mt-2 text-lg">{formatPrice(product.price)}</h5>
            <button className="flex justify-center border-1 w-20 h-10 items-center align-middle rounded-lg mt-8">
              <FaCartPlus size={25} onClick={() => console.log("CLICKED")} />
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};



const formatPrice = (price) => {
  const parts = price.toString().split('.');
  const formattedPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (parts[1] ? ',' + parts[1] : '');
  return `Rp. ${formattedPrice}`;
};
