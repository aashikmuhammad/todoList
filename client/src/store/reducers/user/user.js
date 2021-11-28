import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_SUCCESS,
    CREATE_USER_SUCCESS
} from '../../../helpers/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggedIn: false
            };
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
