import { Field, reduxForm } from 'redux-form';
import { useDispatch } from 'react-redux';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// actions
import { editTask } from '../../actions/task/editTask';

// Helpers
import validate from './validate';
import submit from './submit';
import { renderDateInput, renderField } from '../../helpers/inputComponents';


function EditTodoForm(props) {
  const { handleSubmit, initialValues } = props;
  const dispatch = useDispatch();
  const min = new Date().toISOString().slice(0, 16);
  let defaultExpiredAt = initialValues?.expiredAt?.slice(0, 16);
  const handleReset = () =>dispatch(editTask());

  return (
    <form onSubmit={handleSubmit} >
      <div className="row m-1 p-3">
        <div className="col col-11 mx-auto">
          <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
            <div style={{position: "relative"}} onClick={handleReset} ><FontAwesomeIcon icon={faTimesCircle} className={"close-btn"}/></div>
            <div className="col">
              <Field
                className="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
                type="text"
                placeholder="Add new .."
                name="name"
                component={renderField}
              />
            </div>
            <div className="col-auto m-0 px-2 d-flex align-items-center">
              <label className="text-secondary my-2 p-0 px-1 view-opt-label due-date-label d-none">Due date not set</label>
              <Field
                type="datetime-local"
                component={renderDateInput}
                className="my-2 px-1 btn clear-due-date-button"
                name={"expiredAt"}
                defaultValue={defaultExpiredAt}
                min={min}
              />
            </div>
            <div className="col-auto px-0 mx-0 mr-2">
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

EditTodoForm = reduxForm({
  form: 'EditTodoForm',
  validate,
  onSubmit: submit
})(EditTodoForm)

export default EditTodoForm;