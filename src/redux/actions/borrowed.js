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
