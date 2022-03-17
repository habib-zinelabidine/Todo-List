import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'


const Login = () => {
  
  
  return (
    <div className='bg'>
        <div className='container'>
          <div className='first'> </div>
            <div className='second'>
              <h1>Login</h1>
              <input type="text" placeholder='UserEmail'></input>
              <input type="password" placeholder='Password'></input>
              <Link to='/register'>Create account</Link>
              <button type='submit'>Login</button>
            </div>
            
        </div>
        </div>
  )
}

export default Login
