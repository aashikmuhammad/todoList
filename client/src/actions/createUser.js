
// import {
//     CREATE_USER_START,
// } from '../helpers/constants';
// import axios from 'axios';
import axios from '../helpers/axiosHelper';

export const createUser = () => {

    return async (dispatch, getState) => {
        try {
            // await dispatch({
            //     type: USER_LOGIN_START
            // });
            // alert('testtt')
            // const createUser = await fetch('http://localhost:5000/checkUser', {
            //     method: "post",
            //     body: JSON.stringify({
            //         email: 'sdd@xv.di',
            //         password: '2345678654'
            //     })
            // })
            const createUser = await axios.post('http://localhost:5000/user', {
                    name: 'test1234543',
                    email: 'sddkahhd@ndd.da',
                    password: '23456sdS654'
                },
                {
                    withCredentials: true
                })

            console.log('createUser ---- ', createUser)
        } catch (error) {
            console.log('error --- ', error)
        }
    }
};