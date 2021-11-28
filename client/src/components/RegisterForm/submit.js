import { createUser } from '../../actions/user/createUser';
import { toastr } from 'react-redux-toastr';

const submit = async (values, dispatch) => {
    if (!values.name || !values.email || !values.password) return toastr.error('Please provide all data')

    const { status, errorMessage } = await dispatch(createUser({
        email: values.email,
        password: values.password,
        name: values.name
    }))

    if (status == 200) {
        toastr.success('Success', 'User Created successfully')
    } else {
        toastr.error('Error', errorMessage)
    }
}

export default submit;