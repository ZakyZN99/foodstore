import React from 'react'

export const PrimaryButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} 
            className='sm-full sm:px-[10px] h-[30px] font-medium rounded-md bg-[#FA4A0C] text-[#fff] hover:bg-[#ffff] border-1 border-[#FA4A0C] hover:text-[#FA4A0C]'>
            {children}
        </button>
    )
}