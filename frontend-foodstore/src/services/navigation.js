import { useNavigate } from "react-router-dom"

const navigationPage = () => {
    const navigate = useNavigate()

    const profileNavigation = () => {
        navigate('/me')
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

    const productNavigation = () => {
        navigate('/product')
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
        orderNavigation,
        cartNavigation,
        loginNavigation,
        productNavigation,

        addCategoryNavigation,
        addTagNavigation,
        addProductNavigation,
        addAddressNavigation
    }
}

export default navigationPage