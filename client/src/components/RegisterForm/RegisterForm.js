import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// helpers
import { changePage } from '../../actions/page/page';
import { renderField } from '../../helpers/inputComponents';
import validate from './validate';
import submit from './submit';


function RegisterForm(props) {
    const { handleSubmit } = props;
    const dispatch = useDispatch();
    const handleChangePage = () => dispatch(changePage('login'))

    return (
        <form onSubmit={handleSubmit}>
            <h3>Register</h3>
            <div className="form-group" style={{ margin: "25px 0px" }}>
                <label>Name</label>
                <Field
                    name={"name"}
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    style={{ marginTop: "10px" }}
                    component={renderField}
                />
            </div>
            <div className="form-group" style={{ margin: "25px 0px" }}>
                <label>Email</label>
                <Field
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    name="email"
                    style={{ marginTop: "10px" }}
                    component={renderField}
                />
            </div>
            <div className="form-group" style={{ margin: "25px 0px" }}>
                <label>Password</label>
                <Field
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    name="password"
                    style={{ marginTop: "10px" }}
                    component={renderField}
                />
            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block" style={{ width: "100%" }}>Register</button>
            <p className="forgot-password text-right">
                Already registered <a href="javascript:void(0)" onClick={handleChangePage}>log in?</a>
            </p>
        </form>
    );
}

RegisterForm = reduxForm({
    form: 'RegisterForm',
    validate,
    onSubmit: submit
})(RegisterForm);

export default RegisterForm;