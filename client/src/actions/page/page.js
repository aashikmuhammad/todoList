import {
    PAGE_CHANGE_START,
    PAGE_CHANGE_SUCCESS,
    PAGE_CHANGE_ERROR
} from '../../helpers/constants';

export const changePage = (page) => {
    return async (dispatch) => {
        try {
            await dispatch({ type: PAGE_CHANGE_START })

            if (page == 'login') {
                await dispatch({
                    type: PAGE_CHANGE_SUCCESS,
                    payload: { page: 'login' }
                })
            } else if (page == 'register') {
                await dispatch({
                    type: PAGE_CHANGE_SUCCESS,
                    payload: { page: 'register' }
                })
            }
        } catch (error) {
            await dispatch({
                type: PAGE_CHANGE_ERROR,
                payload: { error }
            })
        }
    }
}