import React, { useState, useContext, useEffect } from "react";
import LoginStore from "../../store/loginStore";
import Input from "../UI/Input/Input";
import './Login.css'

const Login = () => {
  const [regiUsers, setRegiUsers] = useState([])
  const [loginUser, setLoginUser] = useState('harshal123')
  const [loginPass, setLoginPass] = useState('test123')

  const loginCtx = useContext(LoginStore)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    setRegiUsers(users)
  }, [])

  const loginUserHandler = (event) => {
    setLoginUser(event.target.value)
  }

  const loginPassHandler = (event) => {
    setLoginPass(event.target.value)
  }

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    if (loginUser.trim() === '' && loginPass=== '') return;

    const logUser = regiUsers.find(user => {
      if (user.username !== loginUser) {
        console.log('Invalid Username or Password');
        return;
      } else {
        return user;
      };
    })

    if (logUser) {
      if (logUser.password !== loginPass) {
        console.log('Invalid Username or Password');
        return;
      } else {
        loginCtx.setLoginState(true)
        loginCtx.setUserState(logUser.username, logUser.name)
        console.log(`Hello ${logUser.name}`);
      }
    }

    setLoginUser('')
    setLoginPass('')
  }
  
  return (
    <section className="loginSection">
      <h2>Login</h2>
      <form onSubmit={loginSubmitHandler}>
        <div className="inpWrap">
          <Input type="text" id="loginUsername" label="Username" value={loginUser} onChange={loginUserHandler} />
        </div>
        <div className="inpWrap">
          <Input type="password" id="loginUserPass" label="Password" value={loginPass} onChange={loginPassHandler} />
        </div>

        <button>Login</button>
      </form>
    </section>
  )
}

export default Login;