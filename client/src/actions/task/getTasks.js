import {
    GET_TASKS_START,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR
} from '../../helpers/constants';
import axios from '../../helpers/axiosHelper';

export const getTasks = (id) => {

    return async dispatch => {
        try {
            await dispatch({ type: GET_TASKS_START });
            let url = 'http://localhost:5000/tasks', payload = {};
            if (id) url += `/${id}`

            const getTasks = await axios.get(url, {},
                {
                    withCredentials: true
                }
            )
            if (getTasks?.data?.status == 200) {
                if (id == "all") {
                    payload = {
                        othersTasks: getTasks?.data?.result
                    }
                } else if (!id) {
                    payload = {
                        tasks: getTasks?.data?.result
                    }
                }

                await dispatch({
                    type: GET_TASKS_SUCCESS,
                    payload
                });
            } else {
                await dispatch({
                    type: GET_TASKS_ERROR,
                    payload: {
                        errorMessage: getTasks?.data?.errorMessage || "Unable to get Tasks"
                    }
                });
            }
        } catch (error) {
            await dispatch({
                type: GET_TASKS_ERROR,
                payload: { errorMessage: error }
            });
        }
    }
};