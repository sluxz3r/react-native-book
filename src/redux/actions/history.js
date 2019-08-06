import axios from 'axios';
const url = 'https://sluxzer-library.herokuapp.com';

export const userBorrows = (user_ktp, userid, token) => {
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