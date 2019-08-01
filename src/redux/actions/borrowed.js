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
