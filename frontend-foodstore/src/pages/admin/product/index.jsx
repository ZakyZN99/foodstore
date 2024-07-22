    import axios from "axios";
    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { formatPrice } from "../../../utils";
    import Image from "../../../assets/img/Image.jpg";
    import Multiselect from 'multiselect-react-dropdown';
    import Navbar from "../../../components/Navbar";
    import { SideBar } from "../../../components/Sidebar";
    import TableProducts from "../../../components/tables/TableProducts";
import { PrimaryButton } from "../../../components/button/PrimaryButton";

    const ListProduct = () => {
        const [editProductId, setEditProductId] = useState(null);

        const [products, setProducts] = useState([])
        const [categories, setCategories] = useState([]);
        const [tags, setTags] = useState([]);


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
                        <PrimaryButton>Add Product</PrimaryButton>
                        <TableProducts/>
                </div>  
            </div>
        </div>
    )};

    export default ListProduct;