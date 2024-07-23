import React, { useEffect } from 'react'
import 'datatables.net'
import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import PrimaryActionButton from '../button/PrimaryActionButton'
import SecondaryActionButton from '../button/SecondaryActionButton'

export const TableTags = ({onEditTag, onDeleteTag, tags }) => {
    useEffect(() => {
        if (tags.length > 0) {
            if (!$.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable()
            }
        }

        return () => {
            if ($.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy()
            }
        }
    }, [tags])

    return (
        <div className=' overflow-y-auto table-container w-full mx-auto ' >
            <table id='example' className=' display min-w-full' style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse' }}>
                <thead className='bg-gray-50' >
                    <tr>
                        <th>No.</th>
                        <th>Tag Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag, index) =>(
                        <tr key={tag._id}>
                            <td>{index + 1}</td>
                            <td>{tag.name}</td>
                            <td>
                                <div className='flex flex-row gap-2'>
                                    <PrimaryActionButton onClick={(e)=> onEditTag(tag._id, e)}>Edit</PrimaryActionButton>
                                    <SecondaryActionButton onClick={() => onDeleteTag(tag._id)}>Delete</SecondaryActionButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
