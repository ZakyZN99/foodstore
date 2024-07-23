import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../../../components/button/PrimaryButton'
import SecondaryActionButton from '../../../components/button/SecondaryActionButton'
import PrimaryActionButton from '../../../components/button/PrimaryActionButton'

export const EditTag = ({tagData, onClose, onSave}) => {
    const [editedTag, setEditedTag] = useState(tagData)

    useEffect(() => {
        setEditedTag(tagData)
    })

    const handleChange = (e) => {
        setEditedTag(e.target.value);
    };
    return (
        <div className='fixed overflow-y-auto inset-0 flex bg-black bg-opacity-50 justify-center'>
            <div className="bg-white p-6 rounded-md shadow-md  w-[20%] my-48">
                <h1 className=" text-2lg mb-4 font-semibold text-center">Edit Tag</h1>
                <form className="flex flex-col flex-grow" >
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tag Name</label>
                        <input
                        type="text"
                        name="name"
                        value={editedTag.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border-b border-gray-500 shadow-sm p-2"
                        />
                    </div>
                    <div  className=" flex justify-center mt-auto gap-4">
                        <PrimaryActionButton>Save</PrimaryActionButton>
                        <SecondaryActionButton onClick={onClose}>Cancel</SecondaryActionButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
