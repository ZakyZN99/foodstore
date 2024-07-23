import { useState } from "react";
import Multiselect from 'multiselect-react-dropdown';
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import { SecondaryButton } from "../../../components/button/SecondaryButton";
import Swal from "sweetalert2";

const AddProduct = ({onClose, onSave, categories, tags}) => {
    const [addedProduct, setAddedProduct] = useState({
        name: '',
        description: '',
        price: '',
        image_url: '',
        category: '',
        tags: ''
    })
    const [selectedTags, setSelectedTags] = useState([]);
    const [imagePreview, setImagePreview] = useState(null)

    const handleChange = (e) => {
        const {name, value} = e.target
        setAddedProduct((prev) => ({...prev, [name]: value}))
    }

    const handleCategoryChange = (e) => {
        setAddedProduct((prev) => ({ ...prev, category: e.target.value }));
    }

    const handleTagChange = (selectedList) => {
        setSelectedTags(selectedList);
        setAddedProduct((prev) => ({ ...prev, tags: selectedList.map(tag => tag.name) }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setAddedProduct((prev) => ({ ...prev, image_url: file }));

        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result)
        }
        if(file){
            reader.readAsDataURL(file)
            console.log(addedProduct)
        }else{
            setImagePreview(null)
        }

    }

    const validate = () => {
        const errors = {};
        if (!addedProduct.name) errors.name = "Name is required";
        if (!addedProduct.description) errors.description = "Description is required";
        if (!addedProduct.price) errors.price = "Price is required";
        if (!addedProduct.category) errors.category = "Category is required";
        if (selectedTags.length === 0) errors.tags = "At least one tag is required";
        if (!addedProduct.image_url) errors.image_url = "Image is required";
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

        onSave(addedProduct)
        onClose();
    } 


return (
    <div className="fixed overflow-y-auto inset-0 flex bg-black bg-opacity-50 justify-center">
        <div className="bg-white p-6 rounded-md shadow-md  w-[50%] my-14">
            <h1 className=" text-2lg mb-4 font-semibold text-center">Add Product</h1>
            <form className="flex flex-col flex-grow">
                <div className="flex gap-4 flex-grow">
                    <div className="flex flex-col w-[50%]">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                            type="text"
                            name="name"
                            value={addedProduct.name}
                            onChange={handleChange}
                            className="mt-1 block w-full border-b border-gray-500 shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={addedProduct.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border-b border-gray-500 shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={addedProduct.price}
                                onChange={handleChange}
                                className="mt-1 block w-full border-b border-gray-500 shadow-sm p-2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select className="w-[100%] h-[40px] rounded-xl border-gray-400  border-[1px] p-1"
                                value={addedProduct.category}
                                onChange={handleCategoryChange}>
                                <option value=''>Select Category</option>
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
                    <PrimaryButton onClick={handleSaveProduct}>Add</PrimaryButton>
                    <SecondaryButton  onClick={onClose}>Cancel</SecondaryButton>
                </div>
            </form>
        </div>  
    </div>
)};

export default AddProduct;