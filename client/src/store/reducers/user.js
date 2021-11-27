import {USER_LOGIN_SUCCESS  } from '../../helpers/constants';

export default (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...action.payload
            };
        default:
            return state;
    }
};
