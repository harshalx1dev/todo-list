import React, { useEffect, useState } from "react";
import Input from "../UI/Input/Input";
import './Register.css';

const Register = () => {
  const [regiUsers, setRegiUsers] = useState([]);
  const [nameInp, setNameInp] = useState('');
  const [usernameInp, setUsernameInp] = useState('');
  const [passwordInp, setPasswordInp] = useState('');

  useEffect(() => {
    const users =  JSON.parse(localStorage.getItem('registeredUsers')) || regiUsers;
    setRegiUsers(users)
  }, [])

  const setLocalStorage = (users) => {
    localStorage.setItem('registeredUsers', JSON.stringify(users))
  }

  const generateID = (username) => {
    const num = Math.random() * 1000;
    const id = Math.floor(num) + username;
    return id;
  }

  generateID('hello')

  const nameInpHandler = (event) => {
    setNameInp(event.target.value)
  }

  const usernameInpHandler = (event) => {
    setUsernameInp(event.target.value)
  }

  const passwordInpHandler = (event) => {
    setPasswordInp(event.target.value)
  }

  const regiSubmitHandler = (event) => {
    event.preventDefault();

    if(nameInp.trim() === '' || usernameInp.trim() === '' || passwordInp.trim() === '') return;

    const newUser = {
      id: generateID(usernameInp),
      name: nameInp,
      username: usernameInp,
      password: passwordInp,
    }

    setRegiUsers((prevState) => {
      setLocalStorage([...prevState, newUser]);
      return [...prevState, newUser];
    })
    setNameInp('')
    setUsernameInp('')
    setPasswordInp('')
  }
 
  return (
    <section className="regiSection">
      <h2>Register</h2>
      <form onSubmit={regiSubmitHandler}>
        <div className="inpWrap">
          <Input type="text" id="regiFullName" label="Full Name" value={nameInp} onChange={nameInpHandler} />
        </div>
        <div className="inpWrap">
          <Input type="text" id="regiUsername" label="Username" value={usernameInp} onChange={usernameInpHandler} />
        </div>
        <div className="inpWrap">
          <Input type="password" id="regiUserPass" label="Password" value={passwordInp} onChange={passwordInpHandler} />
        </div>

        <button>Register</button>
      </form>
    </section>
  )
}

export default Register;