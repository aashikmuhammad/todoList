import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import TaskItem from './TaskItem';

// Action
import { getTasks } from '../../actions/task/getTasks';

function OthersTasks() {
    const dispatch = useDispatch();

    useEffect(() => dispatch(getTasks('all')), [])

    const { tasks, editableId } = useSelector(state => ({
        tasks: state?.task?.othersTasks,
        editableId: state?.task?.editableId
    }))

    return (
        <div class="row m-1 p-3s">
            <div class="col col-11 mx-auto">
                {tasks?.length > 0 && tasks.map((task, i) => (<TaskItem key={i} task={task} id={editableId} others={true} />))}
            </div>
        </div>
    )
}

export default OthersTasks;