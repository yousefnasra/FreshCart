import axios from "axios";
import { createContext, useState } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const [isWished, setIsWished] = useState([])
    let headers = {
        token: localStorage.getItem('userToken')
    }
    const baseUrl = 'https://ecommerce.routemisr.com/api/v1/wishlist';

    function addProductToWishlist(productId) {
        return axios.post(baseUrl, { productId }, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    function removeProductFromWishlist(productId) {
        return axios.delete(`${baseUrl}/${productId}`, { headers })
            .then((response) => response)
            .catch((error) => error)
    }

    return <WishListContext.Provider value={{ addProductToWishlist, removeProductFromWishlist, isWished, setIsWished }}>
        {children}
    </WishListContext.Provider>
}