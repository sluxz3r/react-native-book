import axios from 'axios';
import {AsyncStorage} from 'react-native'

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get('http://192.168.6.199:6969/user/',
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
        payload: axios.get(`http://localhost:6969/user/${userid}`,
            {
                headers: {
                    "authorization": "x-control-user",
                    "x-access-token": `token: ${AsyncStorage.jwtToken}`,
                    "x-control-user": AsyncStorage.userid
                }
            }),

    }
};

export const deleteMember = (userid) => {
    return {
        type: 'DELETE_USER', userid,
        payload: axios.delete(`http://localhost:6969/member/${userid}`,
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
        payload: axios.post(`http://192.168.6.199:6969/register`, data)
     
    }
};


export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`http://192.168.6.199:6969/login`, data, {
            headers: {
                "authorization": "x-control-user",
            }
        }).then( res => {
            console.log(res.data.result.userid)
           
            const token = res.data.result.token;
            const userid = res.data.result.userid;
            AsyncStorage.setItem('jwtToken', token);
            AsyncStorage.setItem('userid', userid);
        })
    }

};

export const logout = (userid) => {
    return {
        type: 'LOGOUT', userid,
        payload: axios.patch(`http://192.168.6.199:6969/token/${userid}`)
     
    }
};
