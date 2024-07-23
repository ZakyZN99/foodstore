import React from 'react'

export const PrimaryButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} 
            className='bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[35px] w-[150px]'>
            {children}
        </button>
    )
}