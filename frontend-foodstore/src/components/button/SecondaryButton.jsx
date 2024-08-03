import React from 'react'

export const SecondaryButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} 
            className='bg-[#fff] text-[#FA4A0C] border-1 border-[#FA4A0C] font-poppins rounded-md md:text-[16px] text-[12px] font-normal hover:bg-[#FA4A0C] hover:text-[#fff] md:h-[40px] md:w-[150px] w-34'>
            {children}
        </button>
    )
}