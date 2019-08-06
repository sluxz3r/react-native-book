import axios from 'axios';
import {AsyncStorage} from 'react-native';
const url = 'https://sluxzer-library.herokuapp.com'

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`${url}/user/`,
            {
                headers: {
                    "authorization": "x-control-user",
                    "x-access-token": `token: ${AsyncStorage.jwtToken}`,
                    "x-control-user": AsyncStorage.userid
                }
            }),

    }
};

export const getUserId = (userid) => {
    return {
        type: 'GET_USERID',
        payload: axios.get(`${url}/user/${userid}`),

    }
};

export const deleteMember = (userid) => {
    return {
        type: 'DELETE_USER', userid,
        payload: axios.delete(`${url}/member/${userid}`,
        {
            headers: {
                "authorization": "x-control-user",
                "x-access-token": `token: ${AsyncStorage.jwtToken}`,
                "x-control-user": AsyncStorage.userid
            }
        }),
    }

};

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`${url}/register`, data)
     
    }
};


export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`${url}/login`, data, {
            headers: {
                "authorization": "x-control-user",
            }
        }).then( res => {
            const token = res.data.result.token;
            const userid = res.data.result.userid.toString();
            const fullname = res.data.result.fullname;
            const user_ktp = res.data.result.user_ktp.toString();
            const email = res.data.result.email;
    
            AsyncStorage.setItem('userid', userid);
            AsyncStorage.setItem('name', fullname);
            AsyncStorage.setItem('ktp', user_ktp);
            AsyncStorage.setItem('email', email);
            AsyncStorage.setItem('jwtToken', token);
        })
    }

};

export const logout = (userid) => {
    return {
        type: 'LOGOUT', userid,
        payload: axios.patch(`${url}/token/${userid}`)
     
    }
};
