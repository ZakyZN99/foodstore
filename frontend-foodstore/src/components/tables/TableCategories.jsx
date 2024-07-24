import React, { useEffect, useState } from 'react'
import 'datatables.net'
import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import PrimaryActionButton from '../button/PrimaryActionButton'
import SecondaryActionButton from '../button/SecondaryActionButton'

const TableCategories = ({cat, onEditCat, onDeleteCat }) => {
    const [categoryId, setCategoryId] = useState(null);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        if (cat.length > 0) {
            if (!$.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable()
            }
        }

        return () => {
            if ($.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy()
            }
        }
    },[cat])

    const handleEditClick = (category) => {
        setCategoryId(category._id);
        setCategoryName(category.name)
    };

    const handleSaveEditCat = () => {
        onEditCat(categoryId, categoryName)
        setCategoryId(null)
        setCategoryName("")
    }

    return (
        <div className=' overflow-y-auto table-container w-full mx-auto'>
            <table id='example' className=' display min-w-full' style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse' }}>
                <thead className='bg-gray-50' >
                    <tr>
                        <th>No.</th>
                        <th>Category Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {cat.map((cat, index) => (
                    <tr key={cat._id}>
                        <td>{index + 1 }</td>
                        <td>
                            {categoryId === cat._id ? (
                            <input
                                type="text"
                                className="text-black border-b border-gray-700"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)
                            }
                            />
                        ) : (
                            cat.name
                        )}
                        </td>
                        <td>
                            <div className='flex flex-row gap-2'>
                                {categoryId === cat._id ? (
                                    <>
                                        <PrimaryActionButton onClick={handleSaveEditCat}>Save</PrimaryActionButton>
                                        <SecondaryActionButton onClick={() => setCategoryId(null)}>Cancel</SecondaryActionButton>
                                    </>
                                ):(
                                    <>
                                        <PrimaryActionButton onClick={() => handleEditClick(cat)}>Edit</PrimaryActionButton>
                                        <SecondaryActionButton onClick={() => onDeleteCat(cat._id)}>Delete</SecondaryActionButton>
                                    </>
                                )}

                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableCategories
