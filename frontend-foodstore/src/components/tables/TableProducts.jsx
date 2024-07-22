import React, { useEffect, useState } from 'react'
import productService from '../../services/productService'
import 'datatables.net'
import $ from 'jquery'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { formatPrice } from '../../utils'
import Image from '../../assets/img/Image.jpg'

const TableProducts = () => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {

        const fetchProduct = async () => {
            try {
                const res = await productService.getProducts()
                setProducts(res.data.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchProduct()
    },[])

    useEffect(() => {
        if (products.length > 0) {
            // Initialize DataTable only after products are set
            if (!$.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable()
            }
        }

        // Clean up the DataTable on component unmount
        return () => {
            if ($.fn.dataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy()
            }
        }
    }, [products])

    const getImageUrl = (imageName) => {
        try {
        if (imageName && imageName.trim() !== "") {
            return `http://localhost:3000/public/images/product/${imageName}`;
        } else {
            return Image;
        }
        } catch (error) {
            console.error("Error fetching img:", error);
        }
    };

    return (
        <div className='container mx-auto mt-5'>
            <table id='example' className='display'>
                <thead>
                    <tr>
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
                    {products.map((product) =>(                    
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{formatPrice(product.price)}</td>
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
                                <div>
                                    <button type="button" className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md"
                                        onClick={""}>Update</button>
                                    <button type="button"
                                        className="bg-red-600 text-white h-[25px] px-[10px] rounded-md"
                                        onClick={""}
                                    >
                                            Cancel
                                    </button>
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