import React from 'react'

const PrimaryActionButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} 
            className='sm-full sm:px-[10px] h-[25px] rounded-md bg-[#FA4A0C] text-[#fff] hover:bg-[#ffff] border-1 border-[#FA4A0C] hover:text-[#FA4A0C]'>
            {children}
        </button>
    )
}

export default PrimaryActionButton