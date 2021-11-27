import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import {reducer as toastr} from 'react-redux-toastr';
import user from './user';

const reducers = combineReducers({
    user,
    form,
    toastr
})

export default reducers;