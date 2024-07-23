import React, { useEffect, useState } from 'react'
import Multiselect from 'multiselect-react-dropdown';
import Image from "../../../assets/img/Image.jpg";
import { PrimaryButton } from '../../../components/button/PrimaryButton';
import { SecondaryButton } from '../../../components/button/SecondaryButton';
import Swal from "sweetalert2";



const EditProduct = ({product, categories, tags, onClose, onSave}) => {
    const [editedProduct, setEditedProduct] = useState({ ...product})
    const [selectedTags, setSelectedTags] = useState([]);
    const [imagePreview, setImagePreview] = useState(null)

    useEffect(() => {
        if (product) {
            setEditedProduct({ ...product });
            setSelectedTags(product.tags.map(tag => ({ name: tag.name })));
            if (product.image_url) {
                setImagePreview(getImageUrl(product.image_url));
            }else{
                setImagePreview(null)
            }
        }
    },[product])

    const handleChange = (e) =>{
        const {name, value} = e.target
        setEditedProduct((prev) => ({...prev, [name]: value}))
    }

    const handleCategoryChange = (e) => {
        setEditedProduct((prev) => ({ ...prev, category: e.target.value }));
    }
    const handleTagChange = (selectedList) => {
        setSelectedTags(selectedList);
        setEditedProduct((prev) => ({ ...prev, tags: selectedList.map(tag => tag.name) }));
    };

    const getImageUrl = (imageName) => {
        try {
            if (imageName && imageName.trim() !== "") {
                return `http://localhost:3000/public/images/product/${imageName}`;
            } else {
                return Image 
            }
        } catch (error) {
            console.error("Error fetching img:", error); 
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setEditedProduct((prev) => ({ ...prev, image_url: file }));

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        if(file){
            reader.readAsDataURL(file)
        }else{
            setImagePreview(null)
        }

    }

    const validate = () => {
        const errors = {};
        if (!editedProduct.name) errors.name = "Name is required";
        if (!editedProduct.description) errors.description = "Description is required";
        if (!editedProduct.price) errors.price = "Price is required";
        if (!editedProduct.category) errors.category = "Category is required";
        if (selectedTags.length === 0) errors.tags = "At least one tag is required";
        if (!editedProduct.image_url) errors.image_url = "Image is required";
        return errors;
    }

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

    const handleSaveProduct = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            showValidationErrors(validationErrors);
            return;
        }
        onSave(product._id, editedProduct)
        onClose()
    }

    

    return (
        <div className="fixed overflow-y-auto inset-0 flex bg-black bg-opacity-50 justify-center">
            <div className="bg-white p-6 rounded-md shadow-md  w-[50%] my-14">
                <h1 className=" text-2lg mb-4 font-semibold text-center">Edit Product</h1>
                <form className="flex flex-col flex-grow" >
                    <div className="flex gap-4 flex-grow">
                        <div className="flex flex-col w-[50%]">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                type="text"
                                name="name"
                                value={editedProduct.name}
                                onChange={handleChange}
                                className="mt-1 block w-full border-b border-gray-500 shadow-sm p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                type="text"
                                name="description"
                                value={editedProduct.description}
                                onChange={handleChange}
                                className="mt-1 block w-full h-[200px] border-b border-gray-500 shadow-sm p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-b border-gray-500 shadow-sm p-2"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select className="w-[100%] h-[40px] rounded-xl border-gray-400  border-[1px] p-1"
                                    value={editedProduct.category.name}
                                    onChange={handleCategoryChange}>
                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category.name}
                                        >
                                        {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col w-[50%]">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Tag</label>
                                <Multiselect
                                    style={{
                                        chips:{
                                            background: '#FA4A0C'
                                        },
                                        option:{
                                            background: '#FA4A0C'
                                        }
                                    }}
                                    options={tags}
                                    displayValue="name"
                                    onSelect={handleTagChange}
                                    onRemove={handleTagChange}
                                    selectedValues={selectedTags}
                                >
                                </Multiselect>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Image</label>
                                <input
                                    className="block text-sm font-medium text-gray-700"
                                    type="file"
                                    accept=".jpg, .png, .jpeg"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Image Preview"
                                        className="mt-4 max-h-60 object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className=" flex justify-center mt-auto gap-4">
                        <PrimaryButton onClick={handleSaveProduct}>Save</PrimaryButton>
                        <SecondaryButton  onClick={onClose}>Cancel</SecondaryButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProduct
