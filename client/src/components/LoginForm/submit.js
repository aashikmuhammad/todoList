import { userLogin } from '../../actions/user/userLogin';
import { toastr } from 'react-redux-toastr';

const submit = async (values, dispatch) => {
    if (!values.email || !values.password) return toastr.error('Please provide all data')

    const { status, errorMessage } = await dispatch(userLogin({
        email: values.email,
        password: values.password
    }));

    if (status == 200) {
        toastr.success('Success', 'Logged In Successfully')
    } else {
        toastr.error('Error', errorMessage)
    }
}

export default submit;