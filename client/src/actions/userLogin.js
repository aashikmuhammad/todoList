
import {
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_END
} from '../helpers/constants';
import axios from 'axios';

export const userLogin = () => {

    return async (dispatch, getState) => {
        try {
            await dispatch({
                type: USER_LOGIN_START
            });
            // alert('testtt')
            // const userLogin = await fetch('http://localhost:5000/checkUser', {
            //     method: "post",
            //     body: JSON.stringify({
            //         email: 'sdd@xv.di',
            //         password: '2345678654'
            //     })
            // })
            const userLogin = await axios.post('http://localhost:5000/checkUser', {
                data: {
                    email: 'sdd@xv.di',
                    password: '2345678654'
                },
                withCredentials: true
            })

            console.log('userLogin ---- ', userLogin)
        } catch (error) {
            console.log('error --- ', error)
        }
    }
};