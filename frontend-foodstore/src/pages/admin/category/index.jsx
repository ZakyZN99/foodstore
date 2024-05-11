import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCategories = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([])
    const [categoryData, setCategoryData] = useState([])
    const [addCategoryName, setAddCategoryName] = useState([])
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState("");

    useEffect(()=> {
        const token = localStorage.getItem('token');
        const userDataFromStorage = localStorage.getItem('user');
        if(token && userDataFromStorage){
            setUserData(JSON.parse(userDataFromStorage))
            setIsLoggedIn(true);
        }
        const fetchCategories= async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/categories');
                setCategoryData(res.data);
            } catch (e) {
                console.error(e)
            }
        }
        fetchCategories()
    },[])

    const handleAddCategory = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post("http://localhost:3000/api/categories/", {
                name: addCategoryName,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            console.log(`New Category: ${response.data}`);
            setCategoryData([...categoryData, response.data]);
            setAddCategoryName("");
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeleteCategory = async (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                `http://localhost:3000/api/categories/${categoryId}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
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
    const token = localStorage.getItem("token");
    try {
        const response = await axios.put(
        `http://localhost:3000/api/categories/${editCategoryId}`,
        {
            name: editCategoryName,
        },{
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log(`Updated Category: ${response.data}`);
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

    let navigate = useNavigate();

    const handleAddress = () => {
    navigate("/address");
    };

    const handleProfile = () => {
    navigate("/me");
    };

    const handleOrder = () => {
    navigate("/order");
    };

    const handleCategories = () => {
    navigate("/add-category");
    };

    const handleTags = () => {
    navigate("/add-tag");
    };
    
    const handleProduct = () => {
        navigate("/add-product");
    };

return (
    <div className="text-white pl-20 max-w-[1440px] mx-auto">
    <div className="max-w-[1200px] border-1 p-3 mx-30 mt-10">
        <h1 className=" text-lg pb-8 text-left font-semibold">Category</h1>
        <div className="border-1 p-2 flex gap-1">
            <div className="flex flex-col w-[20%]">
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProfile}>Profil</button>
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleOrder} >Order</button>
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleAddress}>Address</button>
            {isLoggedIn && userData.role === "admin" && (
            <>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleCategories}>Categories</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleTags}>Tags</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProduct}>Product</button>
            </>
            )}
            </div>
        <div className="border-1 p-2 w-[80%]">
            <form>
            <h1 className="text-center pb-3 border-b-2">Category</h1>
                <div className="pt-2">
                <label>Add Category: </label>
                <span> </span>
                <input className="w-[35%] text-black pl-2 rounded-md" type="text" value={addCategoryName} onChange={(e) => setAddCategoryName(e.target.value)}/>
                <span> </span>
                <button className=" bg-green-600 text-black h-[25px] w-[150px] transition duration-200 ease-in-out hover:bg-blue-600 rounded-md" onClick={handleAddCategory}>Save</button>
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
                            className="text-black"
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
                            <button type="button" className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md"
                            onClick={handleEditCategory}>Update</button>
                        ) : (
                            <>
                                <button type="button" className="bg-yellow-500 text-black h-[25px] px-[10px] rounded-md"
                                onClick={() => {
                                setEditCategoryId(catg._id);
                                setEditCategoryName(catg.name);
                                }}>Edit</button>
                                <span> </span>
                                <button className="bg-red-600 text-white h-[25px] px-[10px] rounded-md"
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
);
};

export default AddCategories;
