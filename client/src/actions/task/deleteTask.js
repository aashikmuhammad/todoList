import {
    DELETE_TASK_START,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_ERROR
} from '../../helpers/constants';

import { getTasks } from './getTasks';
import { toastr } from 'react-redux-toastr';
import axios from '../../helpers/axiosHelper';

export const deleteTask = (id) => {

    return async dispatch => {
        try {
            await dispatch({ type: DELETE_TASK_START });
            if (!id) {
                await dispatch({ type: DELETE_TASK_START });
                return {
                    status: 400,
                    errorMessage: 'Please provide required Data'
                }
            }
            let url = 'http://localhost:5000/task';
            if (id) url += `/${id}`;

            const deleteTask = await axios.delete(url, {},
                {
                    withCredentials: true
                }
            )
            if (deleteTask?.data?.status == 200) {
                toastr.success('Success', 'Task Deleted Succesfully')
                await dispatch({ type: DELETE_TASK_SUCCESS });
                await dispatch(getTasks())
            } else {
                await dispatch({ type: DELETE_TASK_ERROR });
            }
        } catch (error) {
            await dispatch({
                type: DELETE_TASK_ERROR,
                payload: { errorMessage: error }
            });
        }
    }
};