import {
    PAGE_CHANGE_SUCCESS
} from '../../../helpers/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case PAGE_CHANGE_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}