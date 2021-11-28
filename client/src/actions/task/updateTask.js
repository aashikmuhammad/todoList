import {
    UPDATE_TASKS_START,
    UPDATE_TASKS_SUCCESS,
    UPDATE_TASKS_ERROR
} from '../../helpers/constants';

import axios from '../../helpers/axiosHelper';

export const updateTask = ({ name, expiredAt, isCompleted, id }) => {

    return async (dispatch, getState) => {
        try {
            await dispatch({ type: UPDATE_TASKS_START });

            if (!name || !expiredAt  || ![true,false].includes(isCompleted) || !id) {
                await dispatch({
                    type: UPDATE_TASKS_ERROR,
                    payload: {
                        errorMessage: ' Please Provide all the required data'
                    }
                });
                return;
            }

            const updateTask = await axios.post('http://localhost:5000/task',
                {
                    name,
                    expiredAt,
                    isCompleted,
                    id
                },
                {
                    withCredentials: true
                }
            )

            if (updateTask) {
                await dispatch({
                    type: UPDATE_TASKS_SUCCESS,
                    payload: {
                        ...updateTask
                    }
                });
            } else {
                await dispatch({
                    type: UPDATE_TASKS_ERROR,
                    payload: {
                        errorMessage: "Unable to create User"
                    }
                });
            }

        } catch (error) {
            console.log('error --- ', error);
            await dispatch({
                type: UPDATE_TASKS_ERROR,
                payload: {
                    errorMessage: error
                }
            });
        }
    }
};