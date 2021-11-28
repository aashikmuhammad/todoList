import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import {reducer as toastr} from 'react-redux-toastr';
import user from './user/user';
import task from './task/task';

const reducers = combineReducers({
    user,
    form,
    toastr,
    task
})

export default reducers;