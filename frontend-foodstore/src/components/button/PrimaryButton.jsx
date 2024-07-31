import React from 'react'

export const PrimaryButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} 
            className='bg-[#FA4A0C] text-[#fff] border-1 md:text-[16px] text-[12px] p-2 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] md:h-[40px] md:w-[150px] w-34'>
            {children}
        </button>
    )
}