
import {
    USER_LOGOUT_START,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_ERROR
} from '../../helpers/constants';
import axios from 'axios';

export const userLogout = () => {

    return async (dispatch) => {
        try {
            await dispatch({ type: USER_LOGOUT_START });

            const userLogout = await axios.get('http://localhost:5000/logout', {
                withCredentials: true
            })

            if (!userLogout || (userLogout?.status != 200)) {
                return await dispatch({
                    type: USER_LOGOUT_ERROR,
                    payload: {
                        errorMessage: 'Unable to logout, Please try again later'
                    }
                });
            }
            await dispatch({ type: USER_LOGOUT_SUCCESS });
        } catch (error) {
            await dispatch({
                type: USER_LOGOUT_ERROR,
                payload: {
                    errorMessage: error
                }
            });
        }
    }
};