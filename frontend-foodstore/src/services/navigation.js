import { useNavigate } from "react-router-dom"

const navigationPage = () => {
    const navigate = useNavigate()

    const profileNavigation = () => {
        navigate('/me')
    }

    const homeNavigation = () => {
        navigate('/')
    }

    const orderNavigation = () => {
        navigate('/orders')
    }

    const cartNavigation = () =>{
        navigate('/carts')
    }

    const loginNavigation = () => {
        navigate('/login')
    }
    const registerNavigation = () => {
        navigate('/register')
    }

    const productNavigation = () => {
        navigate('/product')
    }
    const checkoutNavigation = () => {
        navigate('/checkout')
    }

    

    //ADD SMT
    const addCategoryNavigation = () => {
        navigate('/add-category')
    }

    const addTagNavigation = () => {
        navigate('/add-tag')
    }

    const addProductNavigation = () => {
        navigate('/add-product')
    }

    const addAddressNavigation = () => {
        navigate('/address/new-address')
    }


    return {
        profileNavigation,
        homeNavigation,
        orderNavigation,
        cartNavigation,
        loginNavigation,
        registerNavigation,
        productNavigation,
        checkoutNavigation,

        addCategoryNavigation,
        addTagNavigation,
        addProductNavigation,
        addAddressNavigation
    }
}

export default navigationPage