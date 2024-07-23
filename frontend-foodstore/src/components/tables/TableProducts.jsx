import React, { useEffect, useState } from 'react'
import 'datatables.net'
import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { formatPrice } from '../../utils'
import Image from '../../assets/img/Image.jpg'
import PrimaryActionButton from '../button/PrimaryActionButton'
import SecondaryActionButton from '../button/SecondaryActionButton'

const TableProducts = ({ onEditProduct, onDeleteProduct, products  }) => {
    useEffect(() => {
        if (products.length > 0) {
            if (!$.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable()
            }
        }

        return () => {
            if ($.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy()
            }
        }
    }, [products])

    const getImageUrl = (imageName) => {
        try {
        if (typeof imageName === 'string' && imageName.trim() !== "") {
            return `http://localhost:3000/public/images/product/${imageName}`;
        } else {
            return Image;
        }
        } catch (error) {
            console.error("Error fetching img:", error);
        }
    };

    return (
        <div className=' table-container w-full mx-auto ' >
            <table id='example' className=' display min-w-full' style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse' }}>
                <thead className='bg-gray-50' >
                    <tr>
                        <th className='px-6 py-3'>No.</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Tag</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {products.map((product, index) =>(                    
                        <tr key={product._id}>
                            <td className='text-center'>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td className='whitespace-nowrap'>{formatPrice(product.price)}</td>
                            <td>{product.category.name}</td>
                            <td>{product.tags.map((tag, index) => (index ? `, ${tag.name}`: tag.name))}</td>
                            <td>
                                <img
                                    src={getImageUrl ? getImageUrl(product.image_url) : Image}
                                    alt="Product"
                                    style={{ maxWidth: "100px", maxHeight: "100px", display: "block", margin: "auto" }}
                                />
                            </td>
                            <td>
                                <div className='flex flex-row gap-2'>
                                    <PrimaryActionButton onClick={(e) => onEditProduct(product._id, e)}>Edit</PrimaryActionButton>
                                    <SecondaryActionButton onClick={() => onDeleteProduct(product._id)}>Delete</SecondaryActionButton>
                                </div>
                            </td>
                        </tr>
                    ))}                   
                </tbody>
            </table>
        </div>
    )
}

export default TableProducts