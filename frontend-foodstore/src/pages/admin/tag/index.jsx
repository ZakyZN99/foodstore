import { useEffect, useState } from 'react';
import { SideBar } from '../../../components/Sidebar';
import tagService from '../../../services/tagService';
import { TableTags } from '../../../components/tables/TableTags';
import { PrimaryButton } from '../../../components/button/PrimaryButton';
import Swal from 'sweetalert2';
import { EditTag } from './EditTag';

const AddTag = () => {
    const [tagData, setTagData] = useState([])
    const [addTagName, setAddTagName] = useState([])
    const [editTagId, setEditTagId] = useState(null);
    const [editTag, setEditTag] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false)



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

    const handleAddTag = async () => {
        const normalizedTag = addTagName.trim().toLowerCase();
        if (normalizedTag.length < 3 || normalizedTag.length > 21) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Tag Length',
                text: 'Tag name must be between 3 and 20 characters',
            });
            return;
        }
        if (tagData.some(tag => tag.name.toLowerCase() === normalizedTag)) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Tag',
                text: 'Tag already exists',
            });
            return;
        }
        try {
            const response = await tagService.storeTag(addTagName.trim())
            setTagData([...tagData, response.data]);
            setAddTagName("");
            Swal.fire({
                icon: 'success',
                title: 'Tag Added',
                text: 'Tag has been added successfully',
            }).then(() =>{
                window.location.reload(); 
            })
        } catch (e) {
            console.error(e);
        }
    };

    const handleEditTag = async (tagId, e) => {
        e.preventDefault();
        const newTag = tagData.map((t) => t._id === tagId)
        if(newTag){
            setEditTag(newTag)
            setShowEditModal(true)
        }else{
            console.error('tag not found');
        }
    }
    //  const handleEditTag = async (e) => {
    //     e.preventDefault();
    //     const normalizedTag = editTagName.trim().toLowerCase();
    //     if (normalizedTag.length < 3 || normalizedTag.length > 21) {
    //         alert("Tag name must be between 3 and 20 characters");
    //         return;
    //     }
    //     if (tagData.some(tag => tag.name.toLowerCase() === normalizedTag)) {
    //         alert("Tag name already exists");
    //         return;
    //     }
    //     try {
    //         const response = await tagService.putTag(editTagId,  editTagName.trim())
    //         console.log(`Updated Tag: ${response    }`);
    //         setTagData((prevTags) =>
    //             prevTags.map((tag) =>
    //                 tag._id === editTagId ? response.data : tag
    //             )
    //         );
    //         setEditTagId(null);
    //         setEditTagName("");
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

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

   

    const handleCancelEdit = () => {
        setEditTagId(null);
        setEditTagName("");
    };

return (
    <div className="flex flex-row sm:flex-row">
        <SideBar/>
        <div className= "flex justify-center pt-10  md:pt-20 lg:pt-24 h-screen mx-auto">
            <div className="">
                <h1 className="text-center pb-3 font-poppins font-bold text-xl md:text-2xl lg:text-3xl">Tags</h1>
                <div className='mb-4 flex gap-5 justify-between'>
                    <label className="block text-sm font-medium text-gray-700">Tag Name:</label>
                    <input
                        type="text"
                        name="nama"
                        value={addTagName}
                        onChange={(e) => setAddTagName(e.target.value)}
                        className="block w-[50%] border-b border-gray-500 shadow-sm p-1"
                    />
                    <PrimaryButton onClick={handleAddTag}>Add Tag</PrimaryButton>
                </div>
                <TableTags tags={tagData} onEditTag={handleEditTag}/>
                    {/* <div className=" p-2 flex  justify-center gap-1 rounded-md">
                            <form>
                            <div>
                                <table className="w-full border-collapse">
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
                    </div> */}
            </div>

        </div>
        {
            showEditModal &&(
                <EditTag
                    tagData = {editTag}

                />
            )
        }
    </div>
    );
};

export default AddTag;