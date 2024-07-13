import { useEffect, useState } from "react";
import categoryService from "../../../services/categoryService";
import { SideBar } from "../../../components/Sidebar";

const AddCategories = () => {
    const [categoryData, setCategoryData] = useState([])
    const [addCategoryName, setAddCategoryName] = useState([])
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");

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

    const handleAddCategory = async () => {
        try {
            const response = await categoryService.storeCategory(addCategoryName)
            setCategoryData([...categoryData, response.data]);
            setAddCategoryName("");
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await categoryService.deleteCategory(categoryId)
                setCategoryData((prevCategories) =>
                prevCategories.filter((cat) => cat._id !== categoryId)
                );
                alert("Category deleted successfully.");
            } catch (error) {
                console.error("Error deleting category:", error);
            }
        }
    };

    const handleEditCategory = async () => {
    try {
        const response = await categoryService.putCategory(editCategoryId, editCategoryName)
        setCategoryData((prevCategories) =>
            prevCategories.map((cat) =>
            cat._id === editCategoryId ? response.data : cat
            )
        );
        setEditCategoryId(null);
        setEditCategoryName("");
    } catch (e) {
        console.error(e);
        }
    };

return (
    <div className="flex flex-row sm:flex-row">
        <SideBar/>
        <div className="flex justify-center pt-10  md:pt-20 lg:pt-24 h-screen mx-auto">
            <div className="w-full">
                <h1 className="text-center pb-3 font-poppins font-bold text-3xl md:text-4xl lg:text-5xl">Categories</h1>
                <div className="border-1 border-[#000] p-2 flex gap-1 rounded-md">
                    <div className="border-1 border-[#000] p-2 rounded-md">
                        <form>
                            <div className="pt-2">
                                <label>Add Category: </label>
                                <span> </span>
                                <input className="w-[35%] text-black pl-2 border-b border-gray-600" type="text" placeholder="empty" value={addCategoryName} onChange={(e) => setAddCategoryName(e.target.value)}/>
                                <span> </span>
                                <button className=" bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[35px] w-[150px]" onClick={handleAddCategory}>Save</button>
                            </div>
                            <div>
                                <table className="w-full border-collapse">
                                <thead className=" border-b-2">
                                    <tr>
                                        <th className="p-2">No.</th>
                                        <th className="p-2">Category Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {categoryData.map((catg, index)=> (
                                    <tr key={catg._id}>
                                    <td className="p-2">{index +1}</td>
                                    <td className="p-2">
                                        {editCategoryId === catg._id ? (
                                        <input
                                        type="text"
                                        className="text-black border-b border-gray-700"
                                        value={editCategoryName}
                                        onChange={(e) =>
                                            setEditCategoryName(e.target.value)
                                        }
                                        />
                                    ) : (
                                        catg.name
                                    )}
                                    </td>
                                    <td className="p-2">
                                    {editCategoryId === catg._id ? (
                                        <button type="button" className="bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[30px] px-[10px]"
                                        onClick={handleEditCategory}>Update</button>
                                    ) : (
                                        <>
                                            <button type="button"  className="hover:bg-[#FA4A0C] hover:text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal bg-{#fff} text-[#FA4A0C] h-[30px] px-[10px]"
                                            onClick={() => {
                                            setEditCategoryId(catg._id);
                                            setEditCategoryName(catg.name);
                                            }}>Edit</button>
                                            <span> </span>
                                            <button className="bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[30px] px-[10px]"
                                            onClick={() => handleDeleteCategory(catg._id)}>Delete</button>
                                        </>
                                    )}
                                    </td>
                                </tr>
                                ))}
                                </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};

export default AddCategories;
