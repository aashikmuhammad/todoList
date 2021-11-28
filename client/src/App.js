import logo from './logo.svg';
import './App.css';
import { useDispatch } from 'react-redux';
// import { userLogin } from './actions/userLogin';
import { createUser } from './actions/user/createUser';

function App() {
  const dispatch = useDispatch();
  const login = () => {
    dispatch(createUser())
  }
  return (
    <div>
      <button onClick={login}> Click here</button>
    </div>
  );
}

export default App;
