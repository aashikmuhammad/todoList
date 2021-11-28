import { createTask } from '../../actions/task/createTask';
import { getTasks } from '../../actions/task/getTasks';
import { toastr } from 'react-redux-toastr';

const submit = async (values, dispatch, { reset }) => {

    if (!values.name || !values.expiredAt) return toastr.error('Error', 'Please provide all data');

    const { status, errorMessage } = await dispatch(createTask({
        name: values.name,
        expiredAt: values.expiredAt
    }));

    if (status == 200) {
        dispatch(getTasks());
        reset();
        return toastr.success('Success', 'Task Added Successfully')
    } else {
        return toastr.error('Error', errorMessage)
    }
}

export default submit;