import React from 'react'

export const SecondaryButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} 
            className='bg-[#fff] text-[#FA4A0C] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-[#FA4A0C] hover:text-[#fff] h-[35px] w-[150px]'>
            {children}
        </button>
    )
}