import axios from 'axios';
const url = 'https://sluxzer-library.herokuapp.com'

export const getBooks = () => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`${url}`)
    }
};

export const getPagination = (limit) => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`${url}/cek/get?limit=${limit}`),

    }
};

export const getLimit = (limit) => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`${url}/cek/get?limit=${limit}`),

    }
};

export const getBook = (bookid) => {
    return {
        type: 'GET_BOOK', bookid,
        payload: axios.get(`${url}/${bookid}`)
    }

};

export const deleteBook = (bookid) => {
    return {
        type: 'DELETE_BOOK', bookid,
        payload: axios.delete(`${url}/${bookid}`)
    }

};

export const addBook = (data) => {
    return {
        type: 'ADD_BOOK', data,
        payload: axios.post('${url}/', data)
    }
};

export const updateBook = (data, bookid) => {
    return {
        type: 'UPDATE_BOOK',
        payload: axios.patch(`${url}/${bookid}`, data),
    }
};