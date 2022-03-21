import Todo from './pages/Todo';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<Todo />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
