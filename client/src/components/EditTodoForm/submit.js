import { editTask } from '../../actions/task/editTask';
import { updateTask } from '../../actions/task/updateTask';
import { getTasks } from '../../actions/task/getTasks';
import { toastr } from 'react-redux-toastr';

const submit = async (values, dispatch, { reset }) => {
    if (!values.name || !values.expiredAt || !values._id) return toastr.error('Error', 'Please provide all data');

    const { status, errorMessage } = await dispatch(updateTask({
        name: values.name,
        expiredAt: values.expiredAt,
        id: values._id
    }));

    if (status == 200) {
        dispatch(editTask());
        dispatch(getTasks());
        reset();
        return toastr.success('Success', 'Task Updated Successfully')
    } else {
        return toastr.error('Error', errorMessage)
    }
}

export default submit;