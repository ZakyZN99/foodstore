import { useEffect, useState } from "react";
import { SideBar } from "../../../components/Sidebar";
import TableProducts from "../../../components/tables/TableProducts";
import { PrimaryButton } from "../../../components/button/PrimaryButton";
import categoryService from "../../../services/categoryService";
import tagService from "../../../services/tagService";
import AddProduct from "./Add-Product";
import productService from "../../../services/productService";
import Swal from 'sweetalert2'
import EditProduct from "./EditProduct";

const ListProduct = () => {
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productService.getProducts()
                setProducts(res.data.data)
            } catch (err) {
                console.error(err)
            }
        }
        const fetchCategories = async() => {
            try {
                const res  = await categoryService.getCategories()
                setCategories(res.data)
            } catch (err) {
                console.error(err);
            }
        }

        const fetchTags = async() => {
            try {
                const res = await tagService.getTags()
                setTags(res.data)
            } catch (err) {
                console.error(err);
            }
        }

        fetchProduct()
        fetchCategories()
        fetchTags()
    },[])

    const handleAddProduct = (e) => {
        e.preventDefault();
        setShowAddModal(true)
    }

    const handleSaveNewProduct = async (newProduct) => {
        try {
            await productService.storeProduct(newProduct)
            setShowAddModal(false);
            Swal.fire({
                title: "Success!",
                text: "Add New Product!",
                icon: "success"
            }).then(() => {
                window.location.reload(); // Reload the page after the user clicks "OK"
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleEditProduct = (productId, e) => {
        e.preventDefault()
        const newProduct = products.find((product) => product._id === productId)
        if(newProduct){
            setEditProduct(newProduct)
            setShowEditModal(true)
        }else{
            console.error("Product not found");
        }
    }
    const handleSaveEditProduct = async(productId, updatedProduct) => {
        try {
            const res = await productService.putProduct(productId, updatedProduct)
            if(res.status === 200){
                setProducts(
                    products.map((p) =>
                        p._id === productId ? { ...p, ...updatedProduct} : p
                    )
                )
            }
            setEditProduct(null)
            setShowEditModal(false)
            Swal.fire({
                title: "Success!",
                text: "Product Edited!",
                icon: "success"
            }).then(() => {
                window.location.reload(); // Reload the page after the user clicks "OK"
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleDeleteProduct = async( productId) =>{
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
                    await productService.deleteProduct(productId)
                    setProducts(products.filter((prod) => prod._id !== productId));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
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
            <SideBar />
            <div className=" mx-24 flex-1 justify-center pt-3  md:pt-20 lg:pt-24">
                <div className="w-full  ">
                    <h1 className="text-center pb-3 font-poppins font-bold text-xl md:text-2xl lg:text-3xl">List Products</h1>
                    <PrimaryButton onClick={handleAddProduct} >Add Product</PrimaryButton>
                    <TableProducts onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} products={products} />
                </div>  
            </div>
            {
                showAddModal &&(
                    <AddProduct
                        onSave={handleSaveNewProduct}
                        onClose={() => setShowAddModal(false)}
                        categories={categories}
                        tags={tags}
                    />
                )
            }{
                showEditModal && (
                    <EditProduct
                        product = {editProduct}
                        categories={categories}
                        tags={tags}
                        onSave = {handleSaveEditProduct}
                        onClose = {()=> setShowEditModal(false)}
                    />
                )
            }
        </div>
    )};

    export default ListProduct;