import { useEffect, useState } from "react";
import categoryService from "../../../services/categoryService";
import { SideBar } from "../../../components/Sidebar";
import TableCategories from "../../../components/tables/TableCategories";
import Swal from 'sweetalert2';


const AddCategories = () => {
    const [categoryData, setCategoryData] = useState([])
    const [addCategoryName, setAddCategoryName] = useState([])

    useEffect(()=> {
        const fetchCategories= async () => {
            try {
                const res = await categoryService.getCategories()
                setCategoryData(res.data);
            } catch (e) {
                console.error(e)
            }
        }
        fetchCategories()
    },[])

    const formatCatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const handleAddCategory = async () => {
        const formattedCatName = formatCatName(addCategoryName.trim())
        if(formattedCatName.length <3 || formattedCatName.length > 21){
            Swal.fire({
                icon: 'error',
                title: 'Invalid Category Length',
                text: 'Category name must be between 3 and 20 characters',
            });
            return;
        }

        if (categoryData.some(cat => cat.name.toLowerCase() === formattedCatName.toLowerCase())) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Category',
                text: 'Category already exists',
            });
            return;
        }

        try {
            const response = await categoryService.storeCategory(formattedCatName)
            setCategoryData([...categoryData, response.data]);
            setAddCategoryName("");
            Swal.fire({
                title: "Success!",
                text: "New Category has been added!",
                icon: "success"
            }).then(() => {
                window.location.reload(); // Reload the page after the user clicks "OK"
            });
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeleteCategory = async (categoryId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if(result.isConfirmed){
                try {
                    await categoryService.deleteCategory(categoryId)
                    setCategoryData((prev) => prev.filter((cat) => cat._id !== categoryId))
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your category has been deleted.",
                        icon: "success",
                    }).then(() => {
                        window.location.reload();
                    });
                } catch (err) {
                    console.error();
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting category.",
                        icon: "error",
                    });
                }
            }
        })
    };

    const handleEditCategory = async (categoryId, categoryName) => {
    try {
        const formattedCatName = formatCatName(categoryName.trim());
        if(formattedCatName.length < 3 || formattedCatName.length > 21) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Category Length',
                text: 'Category name must be between 3 and 20 characters',
            });
            return;
        }

        if (categoryData.some(cat => cat.name.toLowerCase() === formattedCatName.toLowerCase() && cat._id !== categoryId)) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Category',
                text: 'Category already exists',
            });
            return;
        }

        const response = await categoryService.putCategory(categoryId, categoryName)
        setCategoryData((prev) =>
            prev.map((cat) =>
                cat._id === categoryId ? response.data : cat
            )
        )
        Swal.fire({
            title: "Success!",
            text: "Category Edited!",
            icon: "success"
        }).then(() => {
            window.location.reload(); // Reload the page after the user clicks "OK"
        });
    } catch (e) {
        console.error(e);
        }
    };

return (
    <div className="flex flex-row sm:flex-row">
        <SideBar/>
        <div className="mx-24 flex-1 justify-center pt-3  md:pt-20 lg:pt-24">
            <div className="w-full flex flex-col items-center">
                <h1 className="text-center pb-3 font-poppins font-bold text-xl md:text-2xl lg:text-3xl">Categories</h1>
                <div className="mb-4 flex gap-5 justify-between">
                    <label className="block w-[30%] text-sm font-medium text-gray-700">Category name:</label>
                    <input 
                        className="block w-[50%] border-b border-gray-500 shadow-sm p-1"
                        type="text" 
                        value={addCategoryName} 
                        onChange={(e) => setAddCategoryName(e.target.value)}
                    />
                    <button className=" bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[35px] w-[150px]" onClick={handleAddCategory}>Save</button>
                </div>
                <div className="w-full max-w-4xl flex justify-center">
                    <TableCategories cat={categoryData} onEditCat={handleEditCategory} onDeleteCat={handleDeleteCategory} />
                </div>
            </div>
        </div>
    </div>
);
};

export default AddCategories;
