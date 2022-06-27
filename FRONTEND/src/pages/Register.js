import React,{useState , useEffect ,useContext} from 'react'
import { useNavigate } from "react-router-dom";
import './Register.css'
import { Link } from 'react-router-dom'
import useAxios from '../hooks/useAxios';
import { UserContext } from "../context/UserContext";

const Register = () => {
  const usercontext = useContext(UserContext)
  console.log(usercontext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId,setuserId] = useState(null);

  const {fetchData, loading, error} = useAxios();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const response = await fetchData({url: "/register", data: {email, password}});
    console.log(response);

    if(response){
      const {data} = response;
      setuserId(data.id);
    usercontext.login({token: data.token, user: {id: data.id, email: data.email}})    };
    } 

  
  
  useEffect(() => {
    if(usercontext.loggedin) navigate(`/accueil/${userId}`);
  }, [usercontext.loggedin,userId]);
 
  return (
    <div className='bg'>
        <div className='rg-container'>
          
            <form className='rg-second' onSubmit={handleSubmit}>
              <h1>Sign up</h1>
              <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="UserEmail"
              required
              ></input>
              <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              ></input>
              {error?.response?.data &&  <small style={{color: "red"}}>{error.response.data.message}</small>}
              
              <Link to='/Login'>Login</Link>
              <button type='submit'>Sign up</button>
            </form>
            <div className='rg-first'> </div>
        </div>
        </div>
  )
}

export default Register
