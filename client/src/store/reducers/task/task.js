import {
    GET_TASKS_SUCCESS,
    UPDATE_TASKS_SUCCESS,
    CREATE_TASK_SUCCESS,
    EDIT_TASK_FORM
} from '../../../helpers/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case CREATE_TASK_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case GET_TASKS_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case UPDATE_TASKS_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        case EDIT_TASK_FORM:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};
