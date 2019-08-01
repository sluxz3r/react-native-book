import axios from 'axios';
import {AsyncStorage} from 'react-native';

export const allBorrow = () => {
  return {
    type: 'ALL_BORROWED',
    payload: axios.get(`http://192.168.6.199:6969/borrow/lah/`,
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
    payload: axios.get(`http://192.168.6.199:6969/lah/user/${user_ktp}`,
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
    payload: axios.get(`http://192.168.6.199:6969/lah/${bookid}`)
  }
}

export const postBorrow = (data) => {
  return {
    type: 'POST_BORROW',
    payload: axios.post(`http://192.168.6.199:6969/borrow`, data)
  }
}

export const updateBorrow = (data, bookid) => {
  return {
    type: 'UPDATE_BORROW',
    payload: axios.patch(`http://192.168.6.199:6969/borrow/${bookid}`, data),
  }
};
