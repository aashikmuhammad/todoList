import {
    GET_TASKS_START,
    GET_TASKS_SUCCESS,
    GET_TASKS_ERROR
} from '../../helpers/constants';

import axios from '../../helpers/axiosHelper';

export const getTasks = (id) => {

    return async (dispatch, getState) => {
        try {
            await dispatch({ type: GET_TASKS_START });
            let url = 'http://localhost:5000/task';
            if (id) url += 'id'

            const getTasks = await axios.get(url, {},
                {
                    withCredentials: true
                }
            )

            if (getTasks) {
                await dispatch({
                    type: GET_TASKS_SUCCESS,
                    payload: {
                        ...getTasks,
                        id
                    }
                });
            } else {
                await dispatch({
                    type: GET_TASKS_ERROR,
                    payload: {
                        errorMessage: "Unable to get Tasks"
                    }
                });
            }

        } catch (error) {
            console.log('error --- ', error);
            await dispatch({
                type: GET_TASKS_ERROR,
                payload: {
                    errorMessage: error
                }
            });
        }
    }
};