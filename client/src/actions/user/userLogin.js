
import {
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR
} from '../../helpers/constants';
import axios from 'axios';

export const userLogin = ({ email, password }) => {

    return async dispatch => {
        try {
            await dispatch({ type: USER_LOGIN_START });

            const userLogin = await axios.post('http://localhost:5000/login',
                {
                    email,
                    password
                },
                {
                    withCredentials: true,
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            )
            if (!userLogin || (userLogin?.data?.status != 200)) {
                await dispatch({
                    type: USER_LOGIN_ERROR,
                    payload: {
                        errorMessage: userLogin?.data?.errorMessage ||  'Unable to login, Please try again later'
                    }
                });
                return {
                    status: 400,
                    errorMessage: userLogin?.data?.errorMessage ||  'Unable to login, Please try again later'
                };
            }
            await dispatch({ 
                type: USER_LOGIN_SUCCESS,
                payload: {
                    result: userLogin?.data?.result
                }
             });
            return {
                status: 200,
                result: userLogin?.data?.result
            };
        } catch (error) {
            await dispatch({
                type: USER_LOGIN_ERROR,
                payload: {
                    errorMessage: error
                }
            });
            return {
                status: 400,
                errorMessage: error
            };
        }
    }
};