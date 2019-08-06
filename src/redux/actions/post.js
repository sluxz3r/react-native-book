import axios from 'axios';
const url = 'https://sluxzer-library.herokuapp.com'

export const postBook = (dataFile) => {
    console.log("DATA",dataFile)
    return {
        type: 'POST_BOOK',
        payload: axios.post(`${url}/`, dataFile)
    }

};