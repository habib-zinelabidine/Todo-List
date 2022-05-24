import Todo from './pages/Todo';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import {ContextProvider} from './context/UserContext'


function App() {
  
  return (
    <>
    <ContextProvider>
    <div>
      <Router>
        <Routes>
          <Route exact path='/accueil' element={<Todo />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
    </ContextProvider>
    </>
  );
}

export default App;
