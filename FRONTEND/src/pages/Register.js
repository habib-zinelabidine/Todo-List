import React from 'react'
import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='bg'>
        <div className='rg-container'>
          
            <div className='rg-second'>
              <h1>Sign up</h1>
              <input type="text" placeholder='UserEmail'></input>
              <input type="password" placeholder='Password'></input>
              <Link to='/Login'>Login</Link>
              <button type='submit'>Sign up</button>
            </div>
            <div className='rg-first'> </div>
        </div>
        </div>
  )
}

export default Register
