import React from 'react'
import "../styles/SignUp.css";

const Login = () => {
  return (
    <div className='login-box'>
      <div className='login-left'>
        <img src="src\assets\images\auth.jpeg"></img>
      </div>
      <div className='login-right'>
        <div className='login-div'>
           <form className='login-form'>
            <p className='login-heading'><b>SignUp</b></p>
            <label>Username</label>
            <input placeholder='Username'></input>
            <label>Email</label>
            <input placeholder='Email'></input>
            <label>Password</label>
            <input placeholder='Password'></input>
            <button type='submit' className='login-button'>Login</button>
            <p> Create a new account <a ><u> Sign Up </u></a></p>
           </form>
        </div>
      </div>
    </div>
  )
}

export default Login
