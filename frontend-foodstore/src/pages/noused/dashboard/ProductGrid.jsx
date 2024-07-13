import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ImgSample from '../../assets/img/Image.jpg'
import { FaAngleLeft, FaAngleRight, FaFontAwesome, FaPlus, FaTag} from "react-icons/fa";
import { formatPrice } from '../../../utils';

const ProductsGrid = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const itemsPerPage = 4;


    useEffect( () => {
        const token = localStorage.getItem('token')
        const userDataFromStorage = localStorage.getItem('user');

        if(token && userDataFromStorage){
            setIsLoggedIn(true)
            setUserData(JSON.parse(userDataFromStorage))
        }
        
        const fetchProducts = async () => {
            try {
                const resp = await axios.get("http://localhost:3000/api/product")
                setProducts(resp.data.data)
            } catch (err) {
                console.error(err);
            }
        }
        fetchProducts();
        const autoPagination = setInterval(() => {
            nextPage();
        }, 5000);

        return () => clearInterval(autoPagination);
    }, [currentPage])

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => {
                setIsAnimating(false);
            }, 700); // Match this duration with CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);
    
    const getImageUrl = (imageName) => {
        try {
            if (imageName && imageName.trim() !== "") {
                return `http://localhost:3000/public/images/product/${imageName}`;
            } else {
                return ImgSample;
            }
        } catch (err) {
            console.error(err);
        }
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setIsAnimating(true);
        setTimeout(() => {
            if (currentPage < Math.ceil(products.length / itemsPerPage)) {
                setCurrentPage(currentPage + 1);
            } else {
                setCurrentPage(1); // Loop back to the first page
            }
        }, 700); // Match this duration with CSS transition duration
    };

    const prevPage = () => {
        setIsAnimating(true);
        setTimeout(() => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                setCurrentPage(Math.ceil(products.length / itemsPerPage)); // Loop back to the last page
            }
        }, 700); // Match this duration with CSS transition duration
    };

    return (
        <div className='px-[100px] py-[40px] '>
            <div className={`flex gap-[40px] transition-all duration-700 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                {currentProducts.map((product) => (
                    <div key={product._id} className=' flex'>
                        <div className='w-[400px] h-[700px] border-black shadow rounded-3xl flex flex-col transition-all duration-700 ease-in-out'>
                            <img src={getImageUrl ? getImageUrl(product.image_url) : Image} crossOrigin="anonymous" className='w-full h-50 rounded-t-3xl object-cover' />
                            <div className='flex-grow px-[20px] py-[20px] flex flex-col'>
                                <h1 className=' text-[20px] font-bold pb-[10px]  text-center'>{product.name}</h1>
                                <p className='text-[15px] pb-[4px] font-poppins text-center justify-center'>{product.description}</p>
                                <div className='mt-auto flex items-center justify-between'>
                                    <p className='text-[20px] font-semibold'>{formatPrice(product.price)}</p>
                                    <div className='mr-[20px] flex items-center pt-[5px]'>
                                        <button className='w-[100px] font-semibold border-[#FA4A0C] border-[2px] text-[#FA4A0C] rounded-2xl h-[40px] '>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}  
            </div>
            <div className='flex justify-center mt-4 items-center gap-[50px]'>
                    <button onClick={prevPage} disabled={currentPage === 1} className=' rounded-full bg-[#fff] border-[2px] border-[#FA4A0C]'><FaAngleLeft size={55} color='#FA4A0C'/></button>
                    <button onClick={nextPage}  disabled={currentPage === Math.ceil(products.length / itemsPerPage)} className=' rounded-full bg-[#fff] border-[2px] border-[#FA4A0C]'><FaAngleRight size={55} color='#FA4A0C'/></button>
            </div>   
        </div>
    ) 
}    

export default ProductsGrid
