import {
    UPDATE_TASKS_START,
    UPDATE_TASKS_SUCCESS,
    UPDATE_TASKS_ERROR
} from '../../helpers/constants';
import axios from '../../helpers/axiosHelper';
import { getTasks } from './getTasks';

export const updateTask = ({ name, expiredAt, isCompleted, id }) => {

    return async dispatch => {
        try {
            await dispatch({ type: UPDATE_TASKS_START });
            if (!name && !expiredAt && ![true, false].includes(isCompleted) && !id) {
                await dispatch({
                    type: UPDATE_TASKS_ERROR,
                    payload: {
                        errorMessage: 'Please Provide all the required data'
                    }
                });
                return {
                    status: 400,
                    errorMessage: 'Please Provide all the required data'
                };
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

            if (updateTask?.data?.status == 200) {
                await dispatch({
                    type: UPDATE_TASKS_SUCCESS,
                    payload: {
                        ...updateTask
                    }
                });
                dispatch(getTasks())
                return {
                    status: 200
                };
            } else {
                await dispatch({
                    type: UPDATE_TASKS_ERROR,
                    payload: {
                        errorMessage: updateTask?.data?.errorMessage || "Unable to update task"
                    }
                });
                return {
                    status: 400,
                    errorMessage: updateTask?.data?.errorMessage || "Unable to update task"
                };
            }
        } catch (error) {
            await dispatch({
                type: UPDATE_TASKS_ERROR,
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