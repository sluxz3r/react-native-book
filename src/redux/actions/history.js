import axios from 'axios';

export const userBorrows = (user_ktp, userid, token) => {
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