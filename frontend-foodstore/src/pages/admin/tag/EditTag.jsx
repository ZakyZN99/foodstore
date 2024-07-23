import React, { useEffect, useState } from 'react'
import SecondaryActionButton from '../../../components/button/SecondaryActionButton'
import PrimaryActionButton from '../../../components/button/PrimaryActionButton'
import Swal from "sweetalert2";

export const EditTag = ({tagData, existingTags, onClose, onSave}) => {
    const [editedTag, setEditedTag] = useState({...tagData})

    useEffect(() => {
        setEditedTag({...tagData}) 
    },[tagData])

    const formatTagName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };


    const handleChange = (e) => {
        const {name, value} = e.target
        setEditedTag((prev) => ({...prev, [name]: value}))
    };

    const validate = () => {
        const errors = {};
        const normalizedTag = formatTagName(editedTag.name.trim());
        if (!editedTag.name) errors.name = "Name is required";
        if (normalizedTag.length < 3 || normalizedTag.length > 21) {
            errors.name = "Tag name must be between 3 and 20 characters";
        }
        if (existingTags.some(tag => tag.name.toLowerCase() === normalizedTag.toLowerCase() && tag._id !== editedTag._id)) {
            errors.name = "Tag already exists";
        }
        return errors;
    };

    const showValidationErrors = (errors) => {
        let errorMsg = "";
        for (const key in errors){
            if(errors.hasOwnProperty(key)){
                errorMsg += `<p>${errors[key]}</p>`;
            }
        }
        Swal.fire({
            icon: 'error',
            title: 'Validation Errors',
            html: errorMsg,
            confirmButtonText: 'OK'
        })
    }

    const handleSaveTag = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            showValidationErrors(validationErrors);
            return;
        }
        editedTag.name = formatTagName(editedTag.name.trim());
        onSave(tagData._id, editedTag)
        onClose()
    }

    return (
        <div className='fixed overflow-y-auto inset-0 flex bg-black bg-opacity-50 justify-center'>
            <div className="bg-white p-6 rounded-md shadow-md  w-[50%] my-14 h-[50%]">
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
                        <PrimaryActionButton onClick={handleSaveTag}>Save</PrimaryActionButton>
                        <SecondaryActionButton onClick={onClose}>Cancel</SecondaryActionButton>
                    </div>
                </form>
            </div>
        </div>
    )
}
