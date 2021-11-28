import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import {reducer as toastr} from 'react-redux-toastr';

// Internals
import user from './user/user';
import task from './task/task';
import page from './page/page';

const reducers = combineReducers({
    user,
    form,
    toastr,
    task,
    page
})

export default reducers;