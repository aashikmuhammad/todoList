import { Field, reduxForm } from 'redux-form';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Helpers
import validate from './validate';
import submit from './submit';
import { renderDateInput, renderField } from '../../helpers/inputComponents';

function TodoForm(props) {
  let defaultExpiredAt = new Date();
  defaultExpiredAt.setHours(defaultExpiredAt.getHours() + 24);
  defaultExpiredAt = defaultExpiredAt.toISOString().slice(0, 16);
  const min = new Date().toISOString().slice(0, 16);
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} >
      <div className="row m-1 p-3">
        <div className="col col-11 mx-auto">
          <div className="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
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
              <button type="submit" className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

TodoForm = reduxForm({
  form: 'TodoForm',
  validate,
  onSubmit: submit
})(TodoForm)

export default TodoForm;