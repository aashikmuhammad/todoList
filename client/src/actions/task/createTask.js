import {
    CREATE_TASK_START,
    CREATE_TASK_SUCCESS,
    CREATE_TASK_ERROR
} from '../../helpers/constants';

import axios from '../../helpers/axiosHelper';

export const createTask = ({ name, expiredAt }) => {

    return async (dispatch, getState) => {
        try {
            await dispatch({ type: CREATE_TASK_START });

            if (!name || !expiredAt) {
                await dispatch({
                    type: CREATE_TASK_ERROR,
                    payload: {
                        errorMessage: ' Please Provide all the required data'
                    }
                });
                return;
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

            if (createTask) {
                await dispatch({
                    type: CREATE_TASK_SUCCESS,
                    payload: {
                        ...createTask
                    }
                });
            } else {
                await dispatch({
                    type: CREATE_TASK_ERROR,
                    payload: {
                        errorMessage: "Unable to create Task"
                    }
                });
            }

        } catch (error) {
            console.log('error --- ', error);
            await dispatch({
                type: CREATE_TASK_ERROR,
                payload: {
                    errorMessage: error
                }
            });
        }
    }
};