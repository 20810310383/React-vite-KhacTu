// import axios from 'axios';
import axios from "./axios.customize"

export const fetchAllBookAPI = (current, pageSize) => {

    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`    
    return axios.get(URL_BACKEND)
}

export const createBookAPI = (thumbnail, mainText, author, price, quantity, category) => {
    
    const URL_BACKEND = "/api/v1/book"
    const data = {
        thumbnail: thumbnail,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category
    }
    return axios.post(URL_BACKEND, data)
}