import {
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR
} from '../../helpers/constants';

import axios from '../../helpers/axiosHelper';

export const createUser = ({ name, email, password }) => {

    return async dispatch => {
        try {
            await dispatch({ type: CREATE_USER_START });

            if (!name || !email || !password) {
                await dispatch({
                    type: CREATE_USER_ERROR,
                    payload: {
                        errorMessage: ' Please Provide all the required data'
                    }
                });
                return {
                    status: 400,
                    errorMessage: "Missing required fields"
                };
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
            if (createUser?.data?.status == 200) {
                await dispatch({
                    type: CREATE_USER_SUCCESS,
                    payload: {
                        result: createUser?.data?.result
                    }
                });
                return {
                    status: 200,
                    result: createUser?.data?.result
                };
            } else {
                await dispatch({
                    type: CREATE_USER_ERROR,
                    payload: {
                        errorMessage: createUser?.data?.errorMessage || "Unable to create User"
                    }
                });
                return {
                    status: 400,
                    errorMessage: createUser?.data?.errorMessage || "Unable to create User"
                };
            }
        } catch (error) {
            await dispatch({
                type: CREATE_USER_ERROR,
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