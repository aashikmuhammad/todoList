import {
    CREATE_TASK_START,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_ERROR
} from '../../helpers/constants';

import axios from '../../helpers/axiosHelper';

export const createTask = ({ name, expiredAt }) => {

    return async dispatch => {
        try {
            await dispatch({ type: CREATE_TASK_START });
            if (!name || !expiredAt) {
                await dispatch({
                    type: CREATE_TASK_ERROR,
                    payload: { errorMessage: 'Please Provide all the required data' }
                });
                return {
                    status: 400,
                    errorMessage: 'Please Provide all the required data'
                };
            }

            const createTask = await axios.post('http://localhost:5000/task',
                {
                    name,
                    expiredAt
                },
                {
                    withCredentials: true
                }
            )

            if (createTask?.data?.status == 200) {
                await dispatch({
                    type: CREATE_TASK_SUCCESS,
                    payload: {
                        ...createTask?.data?.result
                    }
                });
                return {
                    status: 200,
                    result: createTask?.data.result
                };
            } else {
                await dispatch({
                    type: CREATE_TASK_ERROR,
                    payload: {
                        errorMessage: createTask?.data?.errorMessage || "Unable to create Task"
                    }
                });
                return {
                    status: 400,
                    errorMessage: createTask?.data?.errorMessage || "Unable to create Task"
                };
            }
        } catch (error) {
            await dispatch({
                type: CREATE_TASK_ERROR,
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