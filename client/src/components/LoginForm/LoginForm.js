import { useDispatch } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Helpers
import { changePage } from '../../actions/page/page';
import { renderField } from '../../helpers/inputComponents';
import validate from './validate';
import submit from './submit';


function LoginForm(props) {
    const { handleSubmit } = props;
    const dispatch = useDispatch();
    const handleChangePage = () => dispatch(changePage('register'))

    return (
        <form onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <div className="form-group" style={{ margin: "25px 0px" }}>
                <label>Email</label>
                <Field
                    name="email"
                    type="email"
                    className="form-control"
                    style={{ marginTop: "10px" }}
                    placeholder="Enter email"
                    component={renderField}
                />
            </div>
            <div className="form-group" style={{ margin: "25px 0px" }}>
                <label>Password</label>
                <Field
                    name={"password"}
                    type="password"
                    className="form-control"
                    style={{ marginTop: "10px" }}
                    placeholder="Enter password"
                    component={renderField}
                />
            </div>
            <button type="submit" className="btn btn-dark btn-lg btn-block" style={{ width: "100%" }}>Sign in</button>
            <p className="forgot-password text-right">
                New User <a href="javascript:void(0)" onClick={handleChangePage}>Register Here</a>
            </p>
        </form>
    );
}

LoginForm = reduxForm({
    form: 'LoginForm',
    validate,
    onSubmit: submit
})(LoginForm);

export default LoginForm;