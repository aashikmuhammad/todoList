import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Actions
import { userLogin } from './actions/user/userLogin';
import { userLogout } from './actions/user/userLogout';
import { changePage } from './actions/page/page';
import { getTasks } from './actions/task/getTasks';

// Components
import TodoForm from './components/Form/TodoForm';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import OwnTasks from './components/Tasks/OwnTasks';
import OthersTasks from './components/Tasks/OthersTasks';

function App({ socket }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userLogin({}))
    dispatch(changePage('login'))
    if (!user?.isLoggedIn) {
      socket?.on('changes', () => {
        dispatch(getTasks())
        dispatch(getTasks('all'))
      })
      return () => (socket?.off('changes'))
    }
  }, [])

  const { page, user } = useSelector(state => ({
    page: state?.page?.page,
    user: state?.user
  }))

  const handleLogout = () => dispatch(userLogout());

  if (!user?.isLoggedIn) {
    return (
      <div className={"wholeDiv"}>
        <div className={'outer'}>
          <div className={'inner'}>
            {page == "login" && <LoginForm />}
            {page == "register" && <RegisterForm />}
          </div>
        </div>
      </div>
    )
  }
  return (
    <div class="container m-5 p-2 rounded mx-auto bg-light shadow">
      <div class="row m-1 p-4" style={{ position: "relative" }}>
        <div class="col">
          <div class="p-1 h1 text-primary text-center mx-auto display-inline-block">
            <u>My Todo-s</u>
          </div>
          <button onClick={handleLogout} className={'logout-icon'}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
        </div>
      </div>
      <TodoForm />
      <div class="p-2 mx-4 border-black-25 border-bottom"></div>
      <br />
      <OwnTasks />
      <div class="p-2 mx-4 border-black-25 border-bottom"></div>
      <br />
      <OthersTasks />
    </div>
  );
}

export default App;