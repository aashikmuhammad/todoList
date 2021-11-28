import {
    EDIT_TASK_FORM
} from '../../helpers/constants';

export const editTask = (editableId = '') => {

    return async dispatch => {
        try {
            await dispatch({
                type: EDIT_TASK_FORM,
                payload: { editableId }
            });
        } catch (error) {
            console.log('error --- ', error);
        }
    }
};