import {
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR
} from '../../helpers/constants';

import axios from '../../helpers/axiosHelper';

export const createUser = ({ name, email, password }) => {

    return async (dispatch, getState) => {
        try {
            await dispatch({ type: CREATE_USER_START });

            if (!name || !email || !password) {
                await dispatch({
                    type: CREATE_USER_ERROR,
                    payload: {
                        errorMessage: ' Please Provide all the required data'
                    }
                });
                return;
            }

            const createUser = await axios.post('http://localhost:5000/signup',
                {
                    name,
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            )

            if (createUser?.status == 200) {
                await dispatch({
                    type: CREATE_USER_SUCCESS,
                    payload: {
                        ...createUser?.result
                    }
                });
            } else {
                await dispatch({
                    type: CREATE_USER_ERROR,
                    payload: {
                        errorMessage: createUser?.errorMessage || "Unable to create User"
                    }
                });
            }

        } catch (error) {
            await dispatch({
                type: CREATE_USER_ERROR,
                payload: {
                    errorMessage: error
                }
            });
        }
    }
};