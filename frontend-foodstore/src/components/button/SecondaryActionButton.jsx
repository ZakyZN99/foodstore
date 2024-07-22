import React from 'react'

const SecondaryActionButton = ({onClick, children}) => {
    return (
        <button onClick={onClick} 
            className='sm-full sm:px-[10px] h-[25px] rounded-md bg-[#ffff] text-[#FA4A0C] hover:bg-[#FA4A0C] border-1 border-[#FA4A0C] hover:text-[#fff]'>
            {children}
        </button>
    )
}

export default SecondaryActionButton