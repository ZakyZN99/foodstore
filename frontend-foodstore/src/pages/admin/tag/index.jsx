import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

const AddTag = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([])
    const [tagData, setTagData] = useState([])
    const [addTagName, setAddTagName] = useState([])
    const [editTagId, setEditTagId] = useState(null);
    const [editTagName, setEditTagName] = useState("");


    useEffect(()=> {
        const token = localStorage.getItem('token');
        const userDataFromStorage = localStorage.getItem('user');
        if(token && userDataFromStorage){
            setUserData(JSON.parse(userDataFromStorage))
            setIsLoggedIn(true);
        }
        const fetchTags= async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/tags');
                setTagData(res.data);
                console.log(res.data);
            } catch (e) {
                console.error(e)
            }
        }
        fetchTags()
    },[])

    const handleAddTags = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post("http://localhost:3000/api/tags/", {
                name: addTagName,
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            });
            console.log(`New Category: ${response.data}`);
            setTagData([...tagData, response.data]);
            setAddTagName("");
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeleteTags = async (tagId) => {
        if (window.confirm("Are you sure you want to delete this tag?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                `http://localhost:3000/api/tags/${tagId}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
            setTagData((prevCategories) =>
            prevCategories.filter((tag) => tag._id !== tagId)
        );
            alert("Category deleted successfully.");
        } catch (error) {
            console.error("Error deleting category:", error);
        }
        }
    };

    const handleEditTag = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
            `http://localhost:3000/api/tags/${editTagId}`,
            {
                name: editTagName,
            },{
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
        );
            console.log(`Updated Category: ${response.data}`);
            setTagData((prevCategories) =>
            prevCategories.map((tag) =>
            tag._id === editTagId ? response.data : tag
        )
        );
            setEditTagId(null);
            setEditTagName("");
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
    <>
    <Navbar/>
    <div className="text-white pl-20 max-w-[1440px] mx-auto">
    <div className="max-w-[1200px] border-1 p-3 mx-30 mt-10">
        <h1 className=" text-lg pb-8 text-left font-semibold">Tags</h1>
        <div className="border-1 p-2 flex gap-1">
            <div className="flex flex-col w-[20%]">
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProfile}>Profil</button>
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleOrder} >Order</button>
            <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleAddress}>Address</button>
            {isLoggedIn && userData.role === "admin" && (
            <>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleCategories}>Categories</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] bg-blue-600 transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleTags}>Tags</button>
                <button className="border-1 pl-[50px] pr-[50px] pt-[5px] pb-[5px] transition duration-200 ease-in-out hover:bg-blue-600 hover:translate-y-1" onClick={handleProduct}>Product</button>
            </>
            )}
            </div>
        <div className="border-1 p-2 w-[80%]">
            <form>
            <h1 className="text-center pb-3 border-b-2">Tags</h1>
                <div className="pt-2">
                <label>Add Tag: </label>
                <span> </span>
                <input className="w-[35%] text-black pl-2 rounded-md" type="text" value={addTagName} onChange={(e) => setAddTagName(e.target.value)}/>
                <span> </span>
                <button className=" bg-green-600 text-black h-[25px] w-[150px] transition duration-200 ease-in-out hover:bg-blue-600 rounded-md" onClick={handleAddTags}>Save</button>
                </div>
            <div>
                <table className="w-full border-collapse">
                <thead className=" border-b-2">
                    <tr>
                        <th className="p-2">No.</th>
                        <th className="p-2">Tag Name</th>
                    </tr>
                </thead>
                <tbody>
                {tagData.map((tag, index)=> (
                        <tr key={tag._id}>
                        <td className="p-2">{index +1}</td>
                        <td className="p-2">
                            {editTagId === tag._id ? (
                            <input
                            type="text"
                            className="text-black"
                            value={editTagName}
                            onChange={(e) =>
                                setEditTagName(e.target.value)
                            }
                            />
                        ) : (
                            tag.name
                        )}
                        </td>
                        <td className="p-2">
                        {editTagId === tag._id ? (
                            <button type="button" className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md"
                            onClick={handleEditTag}>Update</button>
                        ) : (
                            <>
                                <button type="button" className="bg-yellow-500 text-black h-[25px] px-[10px] rounded-md"
                                onClick={() => {
                                setEditTagId(tag._id);
                                setEditTagName(tag.name);
                                }}>Edit</button>
                                <span> </span>
                                <button className="bg-red-600 text-white h-[25px] px-[10px] rounded-md"
                                onClick={() => handleDeleteTags(tag._id)}>Delete</button>
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
    </>
    );
};

export default AddTag;