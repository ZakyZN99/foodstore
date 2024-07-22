import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../utils";
import Image from "../../../assets/img/Image.jpg";
import Multiselect from 'multiselect-react-dropdown';
import Navbar from "../../../components/Navbar";
import { SideBar } from "../../../components/Sidebar";
import TableProducts from "../../../components/tables/TableProducts";

const BackupListProduct = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState([])
    const [editProductId, setEditProductId] = useState(null);

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    // Go to specific page
    const goToPage = (page) => setCurrentPage(page);


    const [editProductNam, setEditProductNam] = useState("");
    const [editProductDesc, setEditProductDesc] = useState("");
    const [editProductPrice, setEditProductPrice] = useState("");
    const [editProductImage, setEditProductImage] = useState("");
    const [editProductCatg, setEditProductCatg] = useState("");
    const [editProductTag, setEditProductTag] = useState("");

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productCategory, setProductCategory] = useState("");
    // const [productTag, setProductTag] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [productImage, setProductImage] = useState(null);

    useEffect(()=> {
        const token = localStorage.getItem('token');
        const userDataFromStorage = localStorage.getItem('user');
        if(token && userDataFromStorage){
            setUserData(JSON.parse(userDataFromStorage))
            setIsLoggedIn(true);
        }
        //PRODUCTS
        const fetchProducts= async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/product',
                {
                    headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
                setProducts(res.data.data);
            } catch (e) {
                console.error(e)
            }
        }
        //CATEGORIES
        const fetchCategories = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategories(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        //TAGS
        const fetchTags = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/api/tags', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTags(res.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTags()
        fetchCategories()
        fetchProducts()
    },[])

    const handleEditPrice = (event) => {
        const value = event.target.value;
        const numericValue = value.replace(/\D/g, "");
        setEditProductPrice(numericValue);
    };

    const handleAddProduct = async () => {
        const token = localStorage.getItem('token');
        
        try {
            const formData = new FormData(); // Create a new FormData object
                    formData.append('name', productName);
                    formData.append('description', productDescription);
                    formData.append('price', productPrice);
                    formData.append('category', productCategory);

                    const tagNames = selectedTags ? selectedTags.map(tag => tag.name) : [];

                    tagNames.forEach((tagName,index) => {
                        formData.append(`tags[${index}]`, tagName);
                    }); // Convert tags array to a comma-separated string
                    if (productImage && productImage.name) {
                        formData.append('image_url', productImage, productImage.name);
                    }
    
            const response = await axios.post(
                "http://localhost:3000/api/product/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data', 
                    },
                }
            );
            console.log(`New Data: ${response.data}`);
            setProducts([...products, response.data]);
            setProductName("");
            setProductDescription("");
            setProductPrice("");
            setProductCategory("");
            setSelectedTags([]);
            setProductImage(null);
            alert("Successfully add product ")
        } catch (e) {
            console.error(e)
        }
    }

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

    const handleDeleteProduct = async (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(
                `http://localhost:3000/api/product/${productId}`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
        setProducts((prevCategories) =>
        prevCategories.filter((prod) => prod._id !== productId)
        );
            alert("Product deleted successfully.");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        }
    };

    const handleEditProduct = async () => {
    const token = localStorage.getItem("token");
    try {
        const formData = new FormData();
        formData.append('name', editProductNam);
        formData.append('description', editProductDesc);
        formData.append('price', editProductPrice);
        formData.append('category', editProductCatg);

        const tagNames = Array.isArray(editProductTag) ? editProductTag.map(tag => tag.name) : [];

        tagNames.forEach((tagName, index) => {
            formData.append(`tags[${index}]`, tagName);
        });

        if (editProductImage) {
            formData.append('image_url', editProductImage, editProductImage.name);
        }

        const response = await axios.put(
            `http://localhost:3000/api/product/${editProductId}`,
            formData,
            {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', 
            },
        }
    );
    alert("Successfully update product ")
    setProducts((prevCategories) =>
        prevCategories.map((product) =>
            product._id === editProductId ? response.data : product
    )
    );
            setEditProductId(null);
            setEditProductNam("");
            setEditProductDesc("");
            setEditProductPrice("");
            setEditProductImage(null);
            setEditProductCatg("");
            setEditProductTag([]);
    } catch (e) {
        console.error(e);
        }
    };

return (
    <div className="flex flex-row sm:flex-row">
        <SideBar />
        <div className=" mx-24 flex-1 justify-center pt-3  md:pt-20 lg:pt-24">
            <div className="w-full  ">
                <h1 className="text-center pb-3 font-poppins font-bold text-xl md:text-2xl lg:text-3xl">List Products</h1>
                    <TableProducts/>
                    
                    {/* <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="border">No.</th>
                                        <th className="border">Product Name</th>
                                        <th className="border">Description</th>
                                        <th className="border">Price</th>
                                        <th className="border">Category</th>
                                        <th className="border">Tag</th>
                                        <th className="border">Image</th>
                                        <th className="border">Option</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((product, index) => (
                                    <tr key={product._id}>
                                        <td className="border">{indexOfFirstItem + index+1}</td>
                                        <td className="border">
                                            {editProductId === product._id ? (
                                                                <input
                                                                    type="text"
                                                                    className="text-black"
                                                                    value={editProductNam}
                                                                    onChange={(e) =>
                                                                        setEditProductNam(e.target.value)
                                                                    }
                                                                />
                                                            ) : (
                                                                product.name
                                            )}</td>
                                        <td className="border">
                                        {editProductId === product._id ? (
                                                                <input
                                                                    type="text"
                                                                    className="text-black"
                                                                    value={editProductDesc}
                                                                    onChange={(e) =>
                                                                        setEditProductDesc(e.target.value)
                                                                    }
                                                                />
                                                            ) : (
                                                                product.description
                                        )}</td>
                                        <td className="border">{editProductId === product._id ? (
                                                                <input
                                                                    type="text"
                                                                    className="text-black"
                                                                    value={editProductPrice}
                                                                    onChange={handleEditPrice}
                                                                />
                                                            ) : (
                                                                formatPrice(product.price)
                                        )}</td>
                                        <td className="border">
                                        {editProductId === product._id ? (
                                            <select className="w-[100%] h-7 text-black"
                                                value={editProductCatg}
                                                onChange={(e) => setEditProductCatg(e.target.value)}>
                                                    {categories.map((category) => (
                                                    <option key={category._id} value={category.name}>{category.name}</option>
                                                    ))}
                                            </select>
                                        ) : (
                                            product.category.name
                                        )}</td>
                                        <td className="border">{editProductId === product._id ? (
                                            <Multiselect
                                                className="text-black"
                                                options={tags}
                                                displayValue="name"
                                                onSelect={(selectedList) => setEditProductTag(selectedList)}
                                                onRemove={(selectedList) => setEditProductTag(selectedList)}
                                                selectedValues={editProductTag}
                                            />
                                        ) : (
                                            product.tags.map((tag, index) => (index ? `, ${tag.name}` : tag.name))
                                        )}</td>
                                        <td className="border">{editProductId === product._id ? (
                                            <input
                                                className="text-white pl-2 rounded-sm w-[100%]"
                                                type="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(e) => setEditProductImage(e.target.files[0])}
                                            />
                                        ) : (
                                            <img
                                                src={getImageUrl ? getImageUrl(product.image_url) : Image}
                                                alt="Product"
                                                style={{ maxWidth: "100px", maxHeight: "100px", display: "block", margin: "auto" }}
                                            />
                                        )}</td>
                                        <td className="border">
                                        {editProductId === product._id ? (
                                        <>
                                            <button type="button" className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md"
                                            onClick={handleEditProduct}>Update</button>
                                            <button type="button"
                                                    className="bg-red-600 text-white h-[25px] px-[10px] rounded-md"
                                                    onClick={() => {
                                                        setEditProductId(null);
                                                        setEditProductNam("");
                                                        setEditProductDesc("");
                                                        setEditProductPrice("");
                                                        setEditProductImage("");
                                                        setEditProductCatg("");
                                                        setEditProductTag("");
                                                    }}
                                                >
                                                    Cancel
                                            </button>
                                        </>
                                        ) : (
                                            <>
                                                <button type="button" className="bg-yellow-500 text-black h-[25px] px-[10px] rounded-md"
                                                onClick={() => {
                                                setEditProductId(product._id);
                                                setProductName(product.name);
                                                }}>Edit</button>
                                                <span> </span>
                                                <button className="bg-red-600 text-white h-[25px] px-[10px] rounded-md"
                                                onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                            </>
                                        )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                    </table> */}
                    <div className="pagination pt-2 gap-1">
                        <button className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md" onClick={prevPage} disabled={currentPage === 1}>Prev</button>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md" key={page} onClick={() => goToPage(page)}>
                                {page}
                        </button>
                    ))}
                        <button className="bg-blue-600 text-white h-[25px] px-[10px] rounded-md" onClick={nextPage} disabled={currentPage === totalPages}>
                            Next
                        </button>
                    </div>
            </div>  
        </div>
    </div>
)};

export default BackupListProduct;