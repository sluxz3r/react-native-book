import axios from 'axios';
const url = 'https://sluxzer-library.herokuapp.com'
import {AsyncStorage} from 'react-native';

export const allBorrow = () => {
  return {
    type: 'ALL_BORROWED',
    payload: axios.get(`${url}/borrow/lah/`,
    {
      headers: {
        "authorization": "x-control-user",
        "x-access-token": `token: ${AsyncStorage.getItem('jwtToken')}`,
        "x-control-user": AsyncStorage.getItem('userid'),
      }
    })
  }
}

export const userBorrows = (user_ktp, userid, token) => {
  console.log("action" , userid, token)
  return {
    type: 'USER_BORROW',
    payload: axios.get(`${url}/lah/user/${user_ktp}`,
    {
      headers: {
        "authorization": "x-control-user",
        "x-access-token": `token: ${token}`,
        "x-control-user": userid,
      }
    })
  }
}

export const getBorrows = (bookid) => {
  return {
    type: 'GET_BORROW',
    payload: axios.get(`${url}/lah/${bookid}`)
  }
}

export const postBorrow = (data) => {
  return {
    type: 'POST_BORROW',
    payload: axios.post(`${url}/borrow`, data)
  }
}

export const updateBorrow = (data, bookid) => {
  return {
    type: 'UPDATE_BORROW',
    payload: axios.patch(`${url}/borrow/${bookid}`, data),
  }
};
