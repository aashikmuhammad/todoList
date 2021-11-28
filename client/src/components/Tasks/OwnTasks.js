import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// styles
import 'bootstrap/dist/css/bootstrap.min.css';

// actions
import { getTasks } from '../../actions/task/getTasks';

// Internals
import TaskItem from './TaskItem';

function OwnTasks(props) {
    const dispatch = useDispatch();

    useEffect(() => dispatch(getTasks()), [])

    const { tasks, editableId } = useSelector(state => ({
        tasks: state?.task?.tasks,
        editableId: state?.task?.editableId
    }))

    return (
        <div class="row m-1 p-3s">
            <div class="col col-11 mx-auto">
                {tasks?.length > 0 && tasks.map((task, i) => (<TaskItem key={i} task={task} id={editableId} />))}
                {tasks?.length == 0 && <p className="text-center">No, Tasks Added</p>}
            </div>
        </div>
    )
}

export default OwnTasks;