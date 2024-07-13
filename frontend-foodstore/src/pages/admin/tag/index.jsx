import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SideBar } from '../../../components/Sidebar';
import tagService from '../../../services/tagService';

const AddTag = () => {
    const [tagData, setTagData] = useState([])
    const [addTagName, setAddTagName] = useState([])
    const [editTagId, setEditTagId] = useState(null);
    const [editTagName, setEditTagName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(7);


    useEffect(()=> {
        const fetchTags= async () => {
            try {
                const res = await tagService.getTags();
                setTagData(res.data);
            } catch (e) {
                console.error(e)
            }
        }
        fetchTags()
    },[])

    // Calculate total pages based on total tags and items per page
    const totalPages = Math.ceil(tagData.length / itemsPerPage);

    // Calculate index range for current page
    const indexOfLastTag = currentPage * itemsPerPage;
    const indexOfFirstTag = indexOfLastTag - itemsPerPage;
    const paginatedTagData = tagData.slice(indexOfFirstTag, indexOfLastTag);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddTags = async () => {
        const normalizedTag = addTagName.trim().toLowerCase();
        if (normalizedTag.length < 3 || normalizedTag.length > 21) {
            alert("Tag name must be between 3 and 20 characters");
            return;
        }
        if (tagData.some(tag => tag.name.toLowerCase() === normalizedTag)) {
            alert("Tag already exists");
            return;
        }
        try {
            const response = await tagService.storeTag(addTagName.trim())
            setTagData([...tagData, response.data]);
            setAddTagName("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteTags = async (tagId) => {
        if (window.confirm("Are you sure you want to delete this tag?")) {
            try {
                await tagService.deleteTag(tagId)
                setTagData((prevCategories) =>
                    prevCategories.filter((tag) => tag._id !== tagId)
                );
            alert("Category deleted successfully.");
        } catch (error) {
            console.error("Error deleting category:", error);
        }
        }
    };

    const handleEditTag = async (e) => {
        e.preventDefault();
        const normalizedTag = editTagName.trim().toLowerCase();
        if (normalizedTag.length < 3 || normalizedTag.length > 21) {
            alert("Tag name must be between 3 and 20 characters");
            return;
        }
        if (tagData.some(tag => tag.name.toLowerCase() === normalizedTag)) {
            alert("Tag name already exists");
            return;
        }
        try {
            const response = await tagService.putTag(editTagId,  editTagName.trim())
            console.log(`Updated Tag: ${response    }`);
            setTagData((prevTags) =>
                prevTags.map((tag) =>
                    tag._id === editTagId ? response.data : tag
                )
            );
            setEditTagId(null);
            setEditTagName("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleCancelEdit = () => {
        setEditTagId(null);
        setEditTagName("");
    };

return (
    <div className="flex flex-row sm:flex-row">
        <SideBar/>
        <div className= "flex justify-center pt-10  md:pt-20 lg:pt-24 h-screen mx-auto">
            <div className="">
                <h1 className="text-center pb-3 font-poppins font-bold text-3xl md:text-4xl lg:text-5xl">Tags</h1>
                <div className=" p-2 flex  justify-center gap-1 rounded-md">
                    <div className="border-1 border-[#000] p-2 rounded-md">
                        <form>
                            <div className="pt-2">
                                <label>Add Tag: </label>
                                <span> </span>
                                <input className="w-[35%] text-black pl-2 border-b border-gray-600" type="text" placeholder="empty"  value={addTagName} onChange={(e) => setAddTagName(e.target.value)}/>
                                <span> </span>
                                <button className=" bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[35px] w-[150px]" onClick={handleAddTags}>Save</button>
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
                            {paginatedTagData.map((tag, index)=> (
                                    <tr key={tag._id}>
                                    <td className="p-2">{indexOfFirstTag  + index +1}</td>
                                    <td className="p-2">
                                        {editTagId === tag._id ? (
                                        <input
                                        type="text"
                                        className="text-black border-b border-gray-700"
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
                                        <>
                                            <button type="button" className="hover:bg-[#FA4A0C] hover:text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal bg-{#fff} text-[#FA4A0C] h-[30px] px-[10px]"
                                                onClick={handleEditTag}>Update</button>
                                            <span> </span>
                                            <button type="button" className="bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[30px] px-[10px]"
                                                onClick={handleCancelEdit}>Cancel</button>
                                        </>
                                        
                                    ) : (
                                        <>
                                            <button type="button" className="hover:bg-[#FA4A0C] hover:text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal bg-{#fff} text-[#FA4A0C] h-[30px] px-[10px]"
                                            onClick={() => {
                                            setEditTagId(tag._id);
                                            setEditTagName(tag.name);
                                            }}>Edit</button>
                                            <span> </span>
                                            <button className="bg-[#FA4A0C] text-[#fff] border-1 border-[#FA4A0C] font-poppins rounded-md font-normal hover:bg-white hover:text-[#FA4A0C] h-[30px] px-[10px]"   
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
                <div className="flex justify-center my-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => handlePageChange(i + 1)} className={`mx-1 px-3 py-0 bg-[#FA4A0C] text-[#fff] rounded-full hover:bg-[#fff] hover:text-[#FA4A0C] border-[2px] border-[#FA4A0C] ${ currentPage === i + 1 && 'bg-[#FA4A0C]' }`}>{i + 1}</button>
                ))}
            </div>
            </div>
        </div>
    </div>
    );
};

export default AddTag;