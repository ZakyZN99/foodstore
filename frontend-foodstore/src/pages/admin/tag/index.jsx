import { useEffect, useState } from 'react';
import { SideBar } from '../../../components/Sidebar';
import tagService from '../../../services/tagService';
import { TableTags } from '../../../components/tables/TableTags';
import { PrimaryButton } from '../../../components/button/PrimaryButton';
import Swal from 'sweetalert2';
import { EditTag } from './EditTag';

const AddTag = () => {
    const [tagData, setTagData] = useState([])
    const [addTagName, setAddTagName] = useState('')
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

    const formatTagName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };
    
    const handleAddTag = async () => {
        const formattedTagName = formatTagName(addTagName.trim());
        if (formattedTagName.length < 3 || formattedTagName.length > 21) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Tag Length',
                text: 'Tag name must be between 3 and 20 characters',
            });
            return;
        }
        if (tagData.some(tag => tag.name.toLowerCase() === formattedTagName.toLowerCase())) {
            Swal.fire({
                icon: 'error',
                title: 'Duplicate Tag',
                text: 'Tag already exists',
            });
            return;
        }
        try {
            const response = await tagService.storeTag(formattedTagName)
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
        const newTag = tagData.find((tag) => tag._id === tagId)
        if(newTag){
            setEditTag(newTag)
            setShowEditModal(true)
        }else{
            console.error('tag not found');
        }
    }

    const handleSaveEditTag= async(tagId, updatedTag) => {
        try {
            const res = await tagService.putTag(tagId, updatedTag.name)
            if(res === 200){
                setTagData(
                    tagData.map((tag) => 
                        tag._id === tagId ? { ...tag, ...updatedTag} : tag
                    )
                )
            }
            setEditTag(null)
            setShowEditModal(false)
            Swal.fire({
                title: "Success!",
                text: "Tag Edited!",
                icon: "success"
            }).then(() => {
                window.location.reload(); // Reload the page after the user clicks "OK"
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteTags = async (tagId) => {
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
                    await tagService.deleteTag(tagId)
                    setTagData(tagData.filter((tag) => tag._id !== tagId))
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your tag has been deleted.",
                        icon: "success",
                    }).then(() => {
                        window.location.reload();
                    });
                } catch (err) {
                    console.error(err);
                    Swal.fire({
                        title: "Error!",
                        text: "An error occurred while deleting the product.",
                        icon: "error",
                    });
                }
            }
        })
    }

return (
    <div className="flex flex-row sm:flex-row">
        <SideBar/>
        <div className=" mx-24 flex-1 justify-center pt-3  md:pt-20 lg:pt-24">
            <div className="w-full flex flex-col items-center">
                <h1 className="text-center pb-3 font-poppins font-bold text-xl md:text-2xl lg:text-3xl">Tags</h1>
                <div className='mb-4 flex gap-5 justify-between'>
                    <label className="block w-[18%] text-sm font-medium text-gray-700">Tag name:</label>
                    <input
                        type="text"
                        name="nama"
                        value={addTagName}
                        onChange={(e) => setAddTagName(e.target.value)}
                        className="block w-[50%] border-b border-gray-500 shadow-sm p-1"
                    />
                    <PrimaryButton onClick={handleAddTag}>Add Tag</PrimaryButton>
                </div>
                <div className="w-full max-w-4xl flex justify-center">
                    <TableTags tags={tagData} onEditTag={handleEditTag} onDeleteTag={handleDeleteTags} />
                </div>
            </div>

        </div>
        {
            showEditModal &&(
                <EditTag
                    tagData = {editTag}
                    existingTags={tagData}
                    onSave = {handleSaveEditTag}
                    onClose = {()=> setShowEditModal(false)}
                />
            )
        }
    </div>
    );
};

export default AddTag;