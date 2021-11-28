
import {
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_ERROR
} from '../../helpers/constants';
import axios from 'axios';

export const userLogin = ({ email, password }) => {

    return async (dispatch, getState) => {
        try {
            await dispatch({ type: USER_LOGIN_START });

            const userLogin = await axios.post('http://localhost:5000/login',
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            )
            if (!userLogin || (userLogin?.status != 200)) {
                return await dispatch({
                    type: USER_LOGIN_ERROR,
                    payload: {
                        errorMessage: userLogin?.errorMessage ||  'Unable to login, Please try again later'
                    }
                });
            }
            await dispatch({ type: USER_LOGIN_SUCCESS });
        } catch (error) {
            await dispatch({
                type: USER_LOGIN_ERROR,
                payload: {
                    errorMessage: error
                }
            });
        }
    }
};