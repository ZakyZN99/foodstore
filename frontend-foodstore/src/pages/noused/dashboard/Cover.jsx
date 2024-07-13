import React, { useState } from 'react'
import cover from '../../assets/img/cover/pexels-horizon-content-2100060-3915857.jpg';
import { Typewriter } from 'react-simple-typewriter'
import { FaArrowRight } from 'react-icons/fa';
import { GoArrowRight } from "react-icons/go";



const Cover = () => {

    const [typeWritterMsg, setTypeWritterMsg] = useState(["Try our gourmet Veggie Delight pizza, made with fresh vegetables and whole wheat crust. A guilt-free indulgence!"]);

return (
    <div className=" text-black max-w-[100%] mx-auto">
        <div className=" relative gap-3">
            <div className="absolute inset-0 bg-black bg-opacity-50 text-center pt-[200px] px-[100px]">
                <h1 className="text-[#fff] font-bold font-poppins text-[70px] ">Health-conscious?</h1>
                <h5 className="text-[#e69758fd] font-light font-poppins text-[30px] pt-[40px]">
                    <Typewriter
                        words={typeWritterMsg}
                        loop={1}
                        typeSpeed={80}
                    />
                </h5>
                <div className='flex justify-center pt-[100px] gap-5'>
                    <button className='flex items-center px-[35px] rounded-3xl font-semibold text-[#FA4A0C] text-[25px] bg-[#fff] border-[#FA4A0C] w-[250px] h-[70px] justify-between'>Order Now <GoArrowRight size={35} /></button>
                    <button className='flex items-center px-[35px] rounded-3xl font-semibold text-[#fff] text-[25px] bg-[#FA4A0C] border-[#FA4A0C] w-[255px] h-[70px] justify-center'>Explore More</button>
                </div>
            </div> 
            <img src={cover} className="w-[100%] h-[865px] cursor-zoom-in object-cover"   alt="Image" />
        </div>
    </div>
    )
}

export default Cover
