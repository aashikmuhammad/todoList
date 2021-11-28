import moment from 'moment';
import { useDispatch } from 'react-redux';

// Styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

// Actions
import { updateTask } from '../../actions/task/updateTask';
import { deleteTask } from '../../actions/task/deleteTask';
import { editTask } from '../../actions/task/editTask';

// Internals
import EditTodoForm from '../EditTodoForm/EditTodoForm';


function TaskItem(props) {
    const dispatch = useDispatch();
    const { id, task, others } = props;

    const handleCheckBox = (e) => {
        let value = e?.target?.checked;
        task?._id && dispatch(updateTask({ isCompleted: value, id: task?._id }))
    }
    const handleDelete = taskId => taskId && dispatch(deleteTask(taskId))
    const handleEdit = taskId => taskId && dispatch(editTask(taskId))

    let isExpired = false;
    if (task?.expiredAt) {
        let expiredAt = moment(task.expiredAt).format('YYYY-MM-DD hh:mm:ss');
        let today = moment().format('YYYY-MM-DD hh:mm:ss');
        isExpired = moment(today).isAfter(expiredAt);
    }

    if (task?._id && id == task?._id) return (<EditTodoForm isEdit={true} initialValues={task} />)

    if (others) {
        return (
            <div class="card-hover-shadow-2x mb-3 card">
                <div className="row" style={{ alignItems: "center", padding: "10px" }}>
                    <div className="col-lg-1 d-flex" style={{ cursor: "pointer" }}>
                        <input type="checkbox" className={"completedCheckbox"} onChange={handleCheckBox} defaultChecked={task?.isCompleted} disabled={true} />
                    </div>
                    <div className="col-lg-8">
                        <div className={"row"}>
                            <div className={"col-12 d-flex justify-content-between"}>
                                <b style={{ cursor: "pointer", wordBreak: "break-all" }}>
                                    {task?.name}
                                    {task?.isCompleted && <span className="badge" style={{ color: "#000", backgroundColor: "#28a745", marginLeft: "10px" }}>Completed</span>}
                                    {!task?.isCompleted && isExpired && <span className="badge" style={{ color: "#fff", backgroundColor: "#dc3545", marginLeft: "10px" }}>Expired</span>}
                                </b>
                                <span className={"text-muted"} data-toggle="tooltip" data-placement="bottom" title={new Date(task?.updatedAt).toUTCString()} style={{ cursor: "pointer" }}>{new Date(task?.updatedAt).toLocaleTimeString()}</span>
                            </div>
                            <div className={"col-12"} style={{ cursor: "pointer" }}>
                                {'by '}<b>{task?.userName}</b>{' on '}<em style={{ fontSize: "0.8rem" }}>{new Date(task?.createdAt).toLocaleTimeString()}</em>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="border border-danger bg-warning text-dark rounded" style={{ cursor: "pointer" }}>
                            <p className={"expired-badge"} style={{ padding: "16px 16px 0px 16px" }}>{new Date(task?.expiredAt).toDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div class="card-hover-shadow-2x mb-3 card">
            <div className="row" style={{ alignItems: "center", padding: "10px" }}>
                <div className="col-lg-1 col-md-1 col-xs-11 d-flex" style={{ cursor: "pointer" }}>
                    <input type="checkbox" className={"completedCheckbox"} onChange={(e) => handleCheckBox(e, task?._id)} defaultChecked={task?.isCompleted == true} />
                </div>
                <div className="col-lg-7 col-md-11 col-xs-11">
                    <div className={"row"}>
                        <div className={"col-12 d-flex justify-content-between"} >
                            <b style={{ cursor: "pointer", wordBreak: "break-all" }}>
                                {task?.name}
                                {task?.isCompleted && <span className="badge" style={{ color: "#000", backgroundColor: "#28a745", marginLeft: "10px" }}>Completed</span>}
                                {!task?.isCompleted && isExpired && <span className="badge" style={{ color: "#fff", backgroundColor: "#dc3545", marginLeft: "10px" }}>Expired</span>}
                            </b>
                            <span className={"text-muted"} data-toggle="tooltip" data-placement="bottom" title={new Date(task?.updatedAt).toUTCString()} style={{ cursor: "pointer" }}>{new Date(task?.updatedAt).toLocaleTimeString()}</span>
                        </div>
                        <div className={"col-12"} style={{ cursor: "pointer" }}>
                            {'by '}<b>{task?.userName}</b>{' on '}<em style={{ fontSize: "0.8rem" }}>{new Date(task?.createdAt).toLocaleTimeString()}</em>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6" data-toggle="tooltip" data-placement="bottom" title={new Date(task?.expiredAt).toUTCString()} style={{ cursor: "pointer" }}>
                    <div className="border border-danger bg-warning text-dark rounded">
                        <p className={"expired-badge"} style={{ padding: "16px 16px 0px 16px" }}>{new Date(task?.expiredAt).toDateString()}</p>
                    </div>
                </div>
                <div className="col-lg-2 col-md-6 button-group">
                    <button className={"btn btn-secondary"} onClick={() => handleEdit(task?._id)}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className={"btn btn-danger"} onClick={() => handleDelete(task?._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskItem;