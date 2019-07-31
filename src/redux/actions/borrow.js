import axios from 'axios';

export const allBorrow = () => {
  return {
    type: 'ALL_BORROW',
    payload: axios.get(`http://192.168.6.199:6969/borrow/lah/`)
  }
}

export const userBorrows = (user_ktp) => {
  return {
    type: 'USER_BORROW',
    payload: axios.get(`http://192.168.6.199:6969/lah/user/${user_ktp}`,
      {
        headers: {
          "authorization": "x-control-user",
          "x-access-token": `token: ${localStorage.jwtToken}`,
          "x-control-user": localStorage.userid
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
