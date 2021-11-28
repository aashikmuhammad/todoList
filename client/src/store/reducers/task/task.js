import {
    GET_TASKS_SUCCESS,
    UPDATE_TASKS_SUCCESS,
    CREATE_TASK_SUCCESS,
} from '../../../helpers/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case GET_TASKS_SUCCESS:
            console.log('GET_TASKS_SUCCESS ---- ', action.payload)
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_TASKS_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
