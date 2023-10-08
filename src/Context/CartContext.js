import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let CartContext = createContext();


export default function CartContextProvider({ children }) {
    const [cartItemsNum, setCartItemsNum] = useState(0);
    let headers = {
        token: localStorage.getItem('userToken')
    }
    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart'

    function addToCart(productId) {
        return axios.post(baseUrl,
            {
                productId
            },
            {
                headers
            }
        ).then((response) => response)
            .catch((error) => error)
    }

    function getLoggedUserCart() {
        return axios.get(baseUrl,
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function removeCartItem(productId) {
        return axios.delete(`${baseUrl}/${productId}`,
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function updateProductQuantity(productId, count) {
        return axios.put(`${baseUrl}/${productId}`,
            {
                count
            },
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    function onlinePayment(cartId, url, values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
            {
                shippingAddress: values
            },
            {
                headers
            }).then((response) => response)
            .catch((error) => error)
    }

    const [cartId, setCartId] = useState(null)
    
    async function getCart() {
        let { data } = await getLoggedUserCart();
        setCartId(data?.data._id)
        
    }

    useEffect(() => {
        getCart()
    }, [])

    return <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeCartItem, updateProductQuantity, cartItemsNum, setCartItemsNum, onlinePayment, cartId }}>
        {children}
    </CartContext.Provider>
}